import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle, FontFamily } from '@tiptap/extension-text-style';
import { useTranslation } from 'react-i18next';
import { Bold, Heading2, Heading3, Italic, List, Pilcrow, Quote, Redo2, Underline as UnderlineIcon, Undo2 } from 'lucide-react';

const FONTS = [
  { key: 'fontSans', value: 'Inter, system-ui, sans-serif' },
  { key: 'fontSerif', value: '"Cormorant Garamond", Georgia, serif' },
  { key: 'fontMono', value: '"JetBrains Mono", ui-monospace, monospace' },
];

export function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const { t } = useTranslation();
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, FontFamily],
    content: value,
    onUpdate: ({ editor: e }) => onChange(e.getHTML()),
    editorProps: { attributes: { class: 'prose-arch min-h-[220px] rounded-b-lg bg-[#121214] p-4 focus:outline-none' } },
  });
  if (!editor) return null;

  const Btn = ({ label, active, onClick, children }: { label: string; active?: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button type="button" onClick={onClick} aria-label={label} title={label} aria-pressed={!!active}
      className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border text-sm ${active ? 'border-[#d4a373] bg-[#d4a373]/15 text-[#d4a373]' : 'border-transparent text-[#b4b4c0] hover:bg-[#222228] hover:text-white'}`}>
      {children}
    </button>
  );
  const c = editor.chain().focus();

  return (
    <div className="overflow-hidden rounded-lg border border-[#2e2e38]">
      <div className="flex flex-wrap items-center gap-1 border-b border-[#2e2e38] bg-[#18181c] p-1.5">
        <Btn label={t('admin.tb.bold')} active={editor.isActive('bold')} onClick={() => c.toggleBold().run()}><Bold className="h-4 w-4" /></Btn>
        <Btn label={t('admin.tb.italic')} active={editor.isActive('italic')} onClick={() => c.toggleItalic().run()}><Italic className="h-4 w-4" /></Btn>
        <Btn label={t('admin.tb.underline')} active={editor.isActive('underline')} onClick={() => c.toggleUnderline().run()}><UnderlineIcon className="h-4 w-4" /></Btn>
        <span className="mx-1 h-6 w-px bg-[#2e2e38]" />
        <Btn label={t('admin.tb.h2')} active={editor.isActive('heading', { level: 2 })} onClick={() => c.toggleHeading({ level: 2 }).run()}><Heading2 className="h-4 w-4" /></Btn>
        <Btn label={t('admin.tb.h3')} active={editor.isActive('heading', { level: 3 })} onClick={() => c.toggleHeading({ level: 3 }).run()}><Heading3 className="h-4 w-4" /></Btn>
        <Btn label={t('admin.tb.p')} active={editor.isActive('paragraph')} onClick={() => c.setParagraph().run()}><Pilcrow className="h-4 w-4" /></Btn>
        <Btn label={t('admin.tb.ul')} active={editor.isActive('bulletList')} onClick={() => c.toggleBulletList().run()}><List className="h-4 w-4" /></Btn>
        <Btn label={t('admin.tb.quote')} active={editor.isActive('blockquote')} onClick={() => c.toggleBlockquote().run()}><Quote className="h-4 w-4" /></Btn>
        <span className="mx-1 h-6 w-px bg-[#2e2e38]" />
        <label className="flex items-center">
          <span className="sr-only">{t('admin.tb.font')}</span>
          <select aria-label={t('admin.tb.font')} className="min-h-[44px] cursor-pointer rounded-lg border border-[#2e2e38] bg-[#121214] px-2 text-xs text-white"
            value={FONTS.find((f) => editor.isActive('textStyle', { fontFamily: f.value }))?.value ?? ''}
            onChange={(e) => (e.target.value ? c.setFontFamily(e.target.value).run() : c.unsetFontFamily().run())}>
            <option value="">{t('admin.tb.font')}</option>
            {FONTS.map((f) => (<option key={f.key} value={f.value}>{t(`admin.tb.${f.key}`)}</option>))}
          </select>
        </label>
        <span className="mx-1 h-6 w-px bg-[#2e2e38]" />
        <Btn label={t('admin.tb.undo')} onClick={() => c.undo().run()}><Undo2 className="h-4 w-4" /></Btn>
        <Btn label={t('admin.tb.redo')} onClick={() => c.redo().run()}><Redo2 className="h-4 w-4" /></Btn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
