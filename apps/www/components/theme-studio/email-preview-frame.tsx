interface EmailPreviewFrameProps {
  html: string;
  title: string;
  pageColor?: string;
}

const DEFAULT_PAGE_COLOR = '#F6F8FA';

export function EmailPreviewFrame({
  html,
  title,
  pageColor = DEFAULT_PAGE_COLOR,
}: EmailPreviewFrameProps) {
  return (
    <div
      className="relative min-h-0 flex-1"
      style={{ backgroundColor: pageColor }}
    >
      <iframe
        title={title}
        srcDoc={html}
        className="absolute inset-0 h-full w-full border-0"
        sandbox="allow-same-origin"
      />
    </div>
  );
}
