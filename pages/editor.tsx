import { useState, useRef } from 'react';
import { Stage, Layer, Image as KonvaImage, Text } from 'react-konva';
import useImage from 'use-image';
import { useRouter } from 'next/router';
import ro from '../locales/ro.json';
import ru from '../locales/ru.json';
import en from '../locales/en.json';

const messages = { ro, ru, en };

export default function Editor() {
  const { locale } = useRouter();
  const t = messages[locale as keyof typeof messages];
  const [upload, setUpload] = useState<string | null>(null);
  const stageRef = useRef<any>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setUpload(reader.result as string);
    reader.readAsDataURL(file);
  };

  const saveDesign = () => {
    if (!stageRef.current) return;
    const dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
    localStorage.setItem('sanduta-design', dataURL);
    alert(t.saved);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t.editorTitle}</h1>
      <input type="file" accept="image/*" onChange={handleUpload} className="mb-4" />
      {upload && (
        <>
          <Stage width={500} height={500} ref={stageRef}>
            <Layer>
              <KonvaImage image={useImage(upload)[0]} x={0} y={0} width={500} height={500} />
              <Text text={t.sample} x={50} y={50} fontSize={24} fill="#fff" />
            </Layer>
          </Stage>
          <button onClick={saveDesign} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">
            {t.save}
          </button>
        </>
      )}
    </div>
  );
}
