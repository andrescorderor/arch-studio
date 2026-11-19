import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle, FontFamily } from '@tiptap/extension-text-style';
import Image from '@tiptap/extension-image';
import { useTranslation } from 'react-i18next';
import { Bold, Heading2, Heading3, ImagePlus, Italic, List, Pilcrow, Quote, Redo2, Underline as UnderlineIcon, Undo2 } from 'lucide-react';
import { compressImageToDataUrl } from '../lib/imageUtils';
import { useToast } from '../context/ToastContext';

const FONTS = [
  { key: 'fontSans', value: 'Inter, system-ui, sans-serif' },
  { key: 'fontSerif', value: '"Cormorant Garamond", Georgia, serif' },
  { key: 'fontMono', value: '"JetBrains Mono", ui-monospace, monospace' },
];

function ToolbarBtn({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      aria-pressed={!!active}
      className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border text-sm transition-colors disabled:opacity-50 ${
        active
          ? 'border-[#9a6b3b] bg-[#9a6b3b]/15 text-[#9a6b3b]'
          : 'border-transparent text-[#52525b] hover:bg-[#e4e4e7]/60 hover:text-[#18181b]'
      }`}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const { t } = useTranslation();
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      Image.configure({ allowBase64: true }),
    ],
    content: value,
    onUpdate: ({ editor: e }) => onChange(e.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose-arch min-h-[240px] rounded-b-lg bg-white p-4 focus:outline-none',
      },
    },
  });

  if (!editor) return null;

  const c = editor.chain().focus();

  const handleInsertPhoto = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error(t('admin.errImageType'));
      return;
    }
    setUploading(true);
    try {
      const dataUrl = await compressImageToDataUrl(file, 1000, 0.72);
      if (dataUrl.length > 450_000) {
        toast.error(t('admin.errImageLarge'));
        return;
      }
      editor.chain().focus().setImage({ src: dataUrl, alt: file.name.replace(/\.[^.]+$/, '') }).run();
    } catch {
      toast.error(t('admin.errImageType'));
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-[#d4d4d8]">
      <div className="flex flex-wrap items-center gap-1 border-b border-[#e4e4e7] bg-[#f4f4f5] p-1.5">
        <ToolbarBtn label={t('admin.tb.bold')} active={editor.isActive('bold')} onClick={() => c.toggleBold().run()}>
          <Bold className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn label={t('admin.tb.italic')} active={editor.isActive('italic')} onClick={() => c.toggleItalic().run()}>
          <Italic className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn label={t('admin.tb.underline')} active={editor.isActive('underline')} onClick={() => c.toggleUnderline().run()}>
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarBtn>
        <span className="mx-1 h-6 w-px bg-[#d4d4d8]" />
        <ToolbarBtn label={t('admin.tb.h2')} active={editor.isActive('heading', { level: 2 })} onClick={() => c.toggleHeading({ level: 2 }).run()}>
          <Heading2 className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn label={t('admin.tb.h3')} active={editor.isActive('heading', { level: 3 })} onClick={() => c.toggleHeading({ level: 3 }).run()}>
          <Heading3 className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn label={t('admin.tb.p')} active={editor.isActive('paragraph')} onClick={() => c.setParagraph().run()}>
          <Pilcrow className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn label={t('admin.tb.ul')} active={editor.isActive('bulletList')} onClick={() => c.toggleBulletList().run()}>
          <List className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn label={t('admin.tb.quote')} active={editor.isActive('blockquote')} onClick={() => c.toggleBlockquote().run()}>
          <Quote className="h-4 w-4" />
        </ToolbarBtn>
        <span className="mx-1 h-6 w-px bg-[#d4d4d8]" />
        <ToolbarBtn
          label={uploading ? t('admin.uploadCompressing') : t('admin.tb.image')}
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          <ImagePlus className="h-4 w-4" />
        </ToolbarBtn>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => void handleInsertPhoto(e.target.files?.[0])}
        />
        <span className="mx-1 h-6 w-px bg-[#d4d4d8]" />
        <label className="flex items-center">
          <span className="sr-only">{t('admin.tb.font')}</span>
          <select
            aria-label={t('admin.tb.font')}
            className="min-h-[44px] cursor-pointer rounded-lg border border-[#d4d4d8] bg-white px-2 text-xs text-[#18181b]"
            value={FONTS.find((f) => editor.isActive('textStyle', { fontFamily: f.value }))?.value ?? ''}
            onChange={(e) => (e.target.value ? c.setFontFamily(e.target.value).run() : c.unsetFontFamily().run())}
          >
            <option value="">{t('admin.tb.font')}</option>
            {FONTS.map((f) => (
              <option key={f.key} value={f.value}>
                {t(`admin.tb.${f.key}`)}
              </option>
            ))}
          </select>
        </label>
        <span className="mx-1 h-6 w-px bg-[#d4d4d8]" />
        <ToolbarBtn label={t('admin.tb.undo')} onClick={() => c.undo().run()}>
          <Undo2 className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn label={t('admin.tb.redo')} onClick={() => c.redo().run()}>
          <Redo2 className="h-4 w-4" />
        </ToolbarBtn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
