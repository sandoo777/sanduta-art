import dynamic from 'next/dynamic';
const EditorDynamic = dynamic(() => import('../pages/editor'), { ssr: false });
export default EditorDynamic;
