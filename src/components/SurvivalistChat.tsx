import { useCallback, useMemo, useRef, useState } from 'react';
import type { ChatStatus, FileUIPart, UIMessage } from 'ai';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent, MessageResponse } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionAddScreenshot,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputProvider,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  type PromptInputMessage,
  usePromptInputAttachments,
} from '@/components/ai-elements/prompt-input';
import { Shimmer } from '@/components/ai-elements/shimmer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import survivalistMark from '@/assets/survivalist-chat-mark.png';
import {
  AlertTriangle,
  Camera,
  Crosshair,
  Compass,
  Gauge,
  ImageIcon,
  Layers3,
  MessageCircle,
  Radio,
  Satellite,
  Search,
  ShieldCheck,
  Signal,
  Trash2,
  Zap,
  X,
} from 'lucide-react';

type ChatEvent = {
  type?: 'text' | 'reasoning' | 'error' | 'done';
  value?: string;
};

const starterPrompts = [
  'Create a 72-hour emergency plan for my household.',
  'Analyze an evacuation route and ask what details you need.',
  'Build a survival kit checklist for storm season.',
  'Search for current guidance on safe water purification.',
];

const CHATGPT_SURVIVALIST_URL = 'https://chatgpt.com/g/g-9hq2xSwvf-survivalist-gpt';

type CommandModes = {
  webIntel: boolean;
  deepBrief: boolean;
  lowLight: boolean;
};

function isCreditFallbackStatus(status: number) {
  return status === 402 || status === 429;
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('');
}

function getFiles(message: UIMessage) {
  return message.parts.filter((part) => part.type === 'file');
}

function AttachmentPreview() {
  const attachments = usePromptInputAttachments();

  if (attachments.files.length === 0) return null;

  return (
    <PromptInputHeader className="border-b border-survival-accent/15 bg-survival-dark/70">
      <div className="flex w-full flex-wrap gap-2">
        {attachments.files.map((file) => (
          <div
            key={file.id}
            className="group relative flex items-center gap-2 rounded-lg border border-survival-accent/25 bg-secondary/80 px-2 py-2 text-xs text-foreground"
          >
            {file.mediaType?.startsWith('image/') ? (
              <img
                src={file.url}
                alt={file.filename ?? 'Uploaded survival context'}
                className="h-10 w-10 rounded-md object-cover"
                loading="lazy"
                width={40}
                height={40}
              />
            ) : (
              <ImageIcon className="h-5 w-5 text-survival-accent" />
            )}
            <span className="max-w-32 truncate">{file.filename ?? 'image'}</span>
            <button
              type="button"
              onClick={() => attachments.remove(file.id)}
              className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive-foreground"
              aria-label="Remove uploaded image"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </PromptInputHeader>
  );
}

function MessageImages({ message }: { message: UIMessage }) {
  const files = getFiles(message);
  const imageFiles = files.filter((file) => file.mediaType?.startsWith('image/'));

  if (imageFiles.length === 0) return null;

  return (
    <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
      {imageFiles.map((file, index) => (
        <img
          key={`${file.url}-${index}`}
          src={file.url}
          alt={file.filename ?? 'Uploaded survival context'}
          className="aspect-square rounded-lg border border-survival-accent/25 object-cover"
          loading="lazy"
          width={160}
          height={160}
        />
      ))}
    </div>
  );
}

function LeverSwitch({
  checked,
  label,
  onCheckedChange,
}: {
  checked: boolean;
  label: string;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="command-switch-bay">
      <span className={cn('command-status-lamp', checked && 'is-active')} aria-hidden="true" />
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={label}
        className="command-lever"
      />
      <span className="command-switch-label">{label}</span>
    </div>
  );
}

function RadarDisplay() {
  return (
    <div className="command-radar" aria-label="Command network scan active">
      <div className="command-radar-sweep" />
      <span className="command-radar-ring command-radar-ring-one" />
      <span className="command-radar-ring command-radar-ring-two" />
      <span className="command-radar-axis command-radar-axis-x" />
      <span className="command-radar-axis command-radar-axis-y" />
      <span className="command-radar-blip command-radar-blip-one" />
      <span className="command-radar-blip command-radar-blip-two" />
      <Crosshair className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-survival-accent/50" />
    </div>
  );
}

export default function SurvivalistChat() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>('ready');
  const [reasoningByMessage, setReasoningByMessage] = useState<Record<string, string>>({});
  const [creditFallbackByMessage, setCreditFallbackByMessage] = useState<Record<string, boolean>>({});
  const [commandModes, setCommandModes] = useState<CommandModes>({
    webIntel: true,
    deepBrief: true,
    lowLight: false,
  });
  const abortRef = useRef<AbortController | null>(null);

  const isBusy = status === 'submitted' || status === 'streaming';

  const requestMessages = useCallback((nextMessages: UIMessage[]) => {
    return nextMessages.map((message) => ({
      role: message.role === 'assistant' ? 'assistant' : 'user',
      content: getText(message),
      files: getFiles(message).map((file) => ({
        filename: file.filename,
        mediaType: file.mediaType,
        url: file.url,
      })),
    }));
  }, []);

  const updateAssistantText = useCallback((assistantId: string, delta: string) => {
    setMessages((current) =>
      current.map((message) => {
        if (message.id !== assistantId) return message;
        const existing = getText(message);
        return {
          ...message,
          parts: [{ type: 'text', text: `${existing}${delta}` }],
        };
      })
    );
  }, []);

  const appendReasoning = useCallback((assistantId: string, delta: string) => {
    setReasoningByMessage((current) => ({
      ...current,
      [assistantId]: `${current[assistantId] ?? ''}${delta}`,
    }));
  }, []);

  const submitMessage = useCallback(
    async (text: string, files: FileUIPart[]) => {
      const trimmed = text.trim();
      if ((!trimmed && files.length === 0) || isBusy) return;

      const userMessage: UIMessage = {
        id: createId('user'),
        role: 'user',
        parts: [
          ...files.map((file) => ({ ...file, type: 'file' as const })),
          ...(trimmed ? [{ type: 'text' as const, text: trimmed }] : []),
        ],
      };
      const assistantId = createId('assistant');
      const assistantMessage: UIMessage = {
        id: assistantId,
        role: 'assistant',
        parts: [{ type: 'text', text: '' }],
      };
      const nextMessages = [...messages, userMessage, assistantMessage];
      setMessages(nextMessages);
      setReasoningByMessage((current) => ({ ...current, [assistantId]: '' }));
      setStatus('submitted');

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const cloudUrl = import.meta.env.VITE_SUPABASE_URL;
        const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        const response = await fetch(`${cloudUrl}/functions/v1/survivalist-chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: publishableKey,
          },
           body: JSON.stringify({
             messages: requestMessages(nextMessages),
             modes: {
               webIntel: commandModes.webIntel,
               deepBrief: commandModes.deepBrief,
             },
           }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => null);
          const isCreditFallback = isCreditFallbackStatus(response.status);
          const message = isCreditFallback
            ? 'Sorry master, community AI credits have run out for today. Please try the Survivalist GPT (CHATGPT version) while credits reset.'
            : typeof errorBody?.message === 'string'
              ? errorBody.message
              : 'Survivalist GPT could not complete this request.';
          if (isCreditFallback) {
            setCreditFallbackByMessage((current) => ({ ...current, [assistantId]: true }));
          }
          updateAssistantText(assistantId, message);
          setStatus('error');
          return;
        }

        const reader = response.body?.getReader();
        if (!reader) {
          updateAssistantText(assistantId, 'Survivalist GPT returned an empty answer.');
          setStatus('error');
          return;
        }

        setStatus('streaming');
        const decoder = new TextDecoder();
        let buffer = '';
        let sawText = false;

        const handleEvent = (line: string) => {
          if (!line.trim()) return;
          let event: ChatEvent;
          try {
            event = JSON.parse(line);
          } catch {
            return;
          }

          if (event.type === 'reasoning' && event.value) {
            appendReasoning(assistantId, event.value);
          }

          if (event.type === 'text' && event.value) {
            sawText = true;
            updateAssistantText(assistantId, event.value);
          }

          if (event.type === 'error' && event.value) {
            updateAssistantText(assistantId, `${sawText ? '\n\n' : ''}${event.value}`);
            setStatus('error');
          }
        };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';
          for (const line of lines) handleEvent(line);
        }

        if (buffer) handleEvent(buffer);
        setStatus((current) => (current === 'error' ? 'error' : 'ready'));
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          updateAssistantText(assistantId, 'Request stopped.');
          setStatus('ready');
          return;
        }
        updateAssistantText(assistantId, 'Survivalist GPT lost connection while answering.');
        setStatus('error');
      } finally {
        abortRef.current = null;
      }
    },
    [appendReasoning, commandModes.deepBrief, commandModes.webIntel, isBusy, messages, requestMessages, updateAssistantText]
  );

  const handleSubmit = useCallback(
    async (message: PromptInputMessage) => {
      await submitMessage(message.text, message.files);
    },
    [submitMessage]
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const headerStats = useMemo(
    () => [
      { icon: ShieldCheck, label: 'Safety first' },
      { icon: Search, label: 'Web-aware' },
      { icon: Camera, label: 'Image-ready' },
    ],
    []
  );

  const setMode = useCallback((mode: keyof CommandModes, checked: boolean) => {
    setCommandModes((current) => ({ ...current, [mode]: checked }));
  }, []);

  return (
    <section className={cn('command-hub relative mx-auto flex min-h-[46rem] max-w-7xl flex-col overflow-hidden rounded-lg border-[3px] border-border bg-survival-dark/95 md:h-[calc(100vh-8rem)] md:min-h-[44rem]', commandModes.lowLight && 'is-low-light')}>
      <div className="command-scanlines pointer-events-none absolute inset-0 z-30" aria-hidden="true" />
      <span className="command-corner command-corner-tl" /><span className="command-corner command-corner-tr" />
      <span className="command-corner command-corner-bl" /><span className="command-corner command-corner-br" />

      <div className="relative z-20 border-b-2 border-border bg-background/95 px-4 py-3 md:px-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={survivalistMark}
              alt="Survivalist GPT"
               className="h-12 w-12 rounded border border-survival-accent/40 bg-background object-cover shadow-lg shadow-survival-accent/20"
              width={1024}
              height={1024}
              loading="eager"
            />
            <div>
               <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-survival-brightAccent">
                 <span className="command-status-lamp is-active" />
                 Command node active // Live in-site AI
              </div>
               <h1 className="font-mono text-xl font-bold uppercase tracking-wider text-foreground md:text-2xl">Survivalist GPT // Field Terminal</h1>
              <p className="text-sm text-muted-foreground">Informational, educational, and research purposes only.</p>
            </div>
          </div>
           <div className="grid grid-cols-3 gap-2 font-mono text-[9px] uppercase text-muted-foreground sm:flex">
            {headerStats.map((item) => (
               <div key={item.label} className="flex items-center justify-center gap-2 rounded-sm border border-border bg-secondary/60 px-3 py-2">
                <item.icon className="h-3.5 w-3.5 text-survival-accent" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1">
        <aside className="command-side-panel hidden w-48 shrink-0 border-r border-border p-4 lg:flex lg:flex-col">
          <div className="command-panel-label"><Gauge className="h-3.5 w-3.5" /> System integrity</div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-sm bg-muted"><div className="h-full w-[92%] bg-survival-accent shadow-[0_0_12px_hsl(var(--accent)/0.6)]" /></div>
          <div className="mt-2 flex justify-between font-mono text-[9px] text-muted-foreground"><span>92% NOMINAL</span><span>SECURE</span></div>
          <div className="mt-7 space-y-3">
            <LeverSwitch checked={commandModes.webIntel} label="Web intel" onCheckedChange={(checked) => setMode('webIntel', checked)} />
            <LeverSwitch checked={commandModes.deepBrief} label="Deep brief" onCheckedChange={(checked) => setMode('deepBrief', checked)} />
            <LeverSwitch checked={commandModes.lowLight} label="Low light" onCheckedChange={(checked) => setMode('lowLight', checked)} />
          </div>
          <div className="mt-auto space-y-3 border-t border-border pt-4 font-mono text-[9px] uppercase text-muted-foreground">
            <div className="flex justify-between"><span>Uplink</span><span className="text-survival-accent">Encrypted</span></div>
            <div className="flex justify-between"><span>Image core</span><span className="text-survival-accent">Ready</span></div>
            <div className="flex justify-between"><span>Safety</span><span className="text-survival-accent">Locked</span></div>
          </div>
        </aside>

        <Conversation className="min-h-0 min-w-0 flex-1 bg-background/85">
        <ConversationContent className="gap-6 px-4 py-6 pb-8 md:px-6">
          {messages.length === 0 ? (
            <ConversationEmptyState className="min-h-[28rem] text-foreground md:min-h-[34rem]">
               <div className="flex max-w-3xl flex-col items-center gap-4 md:gap-6">
                <img
                  src={survivalistMark}
                  alt="Survivalist GPT"
                   className="h-20 w-20 rounded border border-survival-accent/40 bg-background object-cover shadow-2xl shadow-survival-accent/20 md:h-24 md:w-24"
                  width={1024}
                  height={1024}
                  loading="eager"
                />
                <div className="space-y-3 text-center">
                   <div className="inline-flex items-center rounded-sm border border-survival-accent/30 bg-survival-accent/10 px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-survival-brightAccent">
                     <Compass className="mr-2 h-4 w-4 animate-pulse" />
                    Ask questions. Get structured survival guidance.
                  </div>
                   <h2 className="font-mono text-2xl font-bold uppercase md:text-4xl">Your AI Survival Expert</h2>
                  <p className="mx-auto max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                    Upload an image, request current web research, or describe the situation. Survivalist GPT will outline, clarify, and guide toward lawful life-preserving actions.
                  </p>
                </div>
                <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                  {starterPrompts.map((prompt) => (
                    <Button
                      key={prompt}
                      type="button"
                      variant="secondary"
                      onClick={() => submitMessage(prompt, [])}
                       className="command-mission-key h-auto justify-start whitespace-normal rounded-sm border border-border bg-secondary/80 px-4 py-3 text-left text-sm"
                    >
                      <MessageCircle className="h-4 w-4 text-survival-accent" />
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            </ConversationEmptyState>
          ) : (
            messages.map((message) => {
              const text = getText(message);
              const reasoning = reasoningByMessage[message.id]?.trim();
              const showCreditFallback = creditFallbackByMessage[message.id];
              const isAssistantLoading = message.role === 'assistant' && !text && isBusy;

              return (
                 <Message key={message.id} from={message.role} className="max-w-[96%] font-mono md:max-w-[86%]">
                  <MessageContent
                    className={cn(
                      'text-base leading-7',
                      message.role === 'user'
                         ? 'rounded-sm border-r-2 border-survival-brightAccent/40 bg-secondary px-4 py-3 text-foreground shadow-lg shadow-survival-accent/10'
                        : 'max-w-full text-foreground'
                    )}
                  >
                    <MessageImages message={message} />
                    {reasoning && message.role === 'assistant' ? (
                      <details className="mb-4 rounded-xl border border-survival-accent/20 bg-secondary/60 p-3 text-sm text-muted-foreground" open={isAssistantLoading}>
                        <summary className="cursor-pointer font-semibold text-survival-brightAccent">Reasoning summary</summary>
                        <p className="mt-2 whitespace-pre-wrap leading-6">{reasoning}</p>
                      </details>
                    ) : null}
                    {isAssistantLoading ? (
                      <Shimmer className="text-muted-foreground">Forming structured survival guidance...</Shimmer>
                    ) : (
                      <MessageResponse className="prose prose-invert max-w-none prose-headings:text-foreground prose-strong:text-foreground prose-a:text-survival-brightAccent">
                        {text}
                      </MessageResponse>
                    )}
                    {showCreditFallback ? (
                      <a
                        href={CHATGPT_SURVIVALIST_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center justify-center rounded-full border border-survival-brightAccent/40 bg-gradient-to-r from-survival-brightAccent via-survival-accent to-yellow-300 px-5 py-3 text-sm font-extrabold text-survival-dark shadow-xl shadow-survival-accent/20 transition-transform hover:scale-105"
                      >
                        Survivalist GPT (CHATGPT version)
                      </a>
                    ) : null}
                  </MessageContent>
                </Message>
              );
            })
          )}
        </ConversationContent>
        <ConversationScrollButton className="border-survival-accent/30 bg-background/95" />
      </Conversation>

        <aside className="command-side-panel hidden w-44 shrink-0 border-l border-border p-4 xl:flex xl:flex-col">
          <div className="command-panel-label"><Satellite className="h-3.5 w-3.5" /> Network scan</div>
          <RadarDisplay />
          <div className="mt-6 space-y-4 font-mono text-[9px] uppercase">
            <div className="border border-border bg-secondary/40 p-3">
              <span className="text-muted-foreground">Status</span>
              <p className="mt-1 text-survival-accent">Life-preservation protocol active</p>
            </div>
            <div className="border border-destructive/40 bg-destructive/10 p-3 text-destructive-foreground">
              <div className="flex items-center gap-2"><span className="command-alert-lamp" /> Threat scan standing by</div>
            </div>
          </div>
          <div className="mt-auto font-mono text-[8px] uppercase leading-5 text-muted-foreground/70">SYS: STABLE<br />MEM: NOMINAL<br />NODE: SGPT-01</div>
        </aside>
      </div>

      <div className="relative z-20 border-t-2 border-border bg-background/95 p-3 md:p-4">
        <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-1 lg:hidden">
          <LeverSwitch checked={commandModes.webIntel} label="Web intel" onCheckedChange={(checked) => setMode('webIntel', checked)} />
          <LeverSwitch checked={commandModes.deepBrief} label="Deep brief" onCheckedChange={(checked) => setMode('deepBrief', checked)} />
          <LeverSwitch checked={commandModes.lowLight} label="Low light" onCheckedChange={(checked) => setMode('lowLight', checked)} />
        </div>
        <PromptInputProvider>
          <PromptInput
            accept="image/*"
             className="rounded-sm border-survival-accent/30 bg-background shadow-xl shadow-survival-accent/10"
            globalDrop
            maxFileSize={5 * 1024 * 1024}
            maxFiles={3}
            multiple
            onError={(error) => {
              toast({ title: 'Upload issue', description: error.message });
            }}
            onSubmit={handleSubmit}
          >
            <AttachmentPreview />
            <PromptInputTextarea
              className="min-h-20 px-4 text-base text-foreground placeholder:text-muted-foreground md:min-h-24"
               placeholder={commandModes.webIntel ? 'TRANSMIT REQUEST // WEB INTEL ARMED...' : 'TRANSMIT SURVIVAL REQUEST...'}
              disabled={isBusy}
            />
            <PromptInputFooter className="border-t border-survival-accent/15 bg-secondary/50 px-3 py-3">
              <PromptInputTools>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger tooltip="Add image or screenshot" disabled={isBusy}>
                    <ImageIcon className="h-4 w-4" />
                  </PromptInputActionMenuTrigger>
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments label="Upload survival image" />
                    <PromptInputActionAddScreenshot label="Attach screenshot" />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>
                 <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:flex">
                  <AlertTriangle className="h-3.5 w-3.5 text-survival-accent" />
                  Lawful survival guidance only
                </span>
              </PromptInputTools>
              <PromptInputSubmit
                status={status}
                onStop={stop}
                disabled={status === 'submitted'}
                 className="command-transmit bg-survival-accent text-survival-dark hover:bg-survival-brightAccent"
              />
            </PromptInputFooter>
          </PromptInput>
        </PromptInputProvider>
      </div>
    </section>
  );
}
