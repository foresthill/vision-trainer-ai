import type { ViewType } from '@repo/shared-types';

interface InstructionsProps {
  type: ViewType;
}

export function Instructions({ type }: InstructionsProps) {
  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <h3 className="font-semibold mb-2">
        {type === 'parallel' ? 'パラレル視の方法' : 'クロス視の方法'}
      </h3>

      {type === 'parallel' ? (
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
          <li>画面から40-50cm離れて座ります</li>
          <li>画像の奥に焦点を合わせるように、遠くを見つめます</li>
          <li>ぼんやりと見ていると、立体的な形が浮かび上がってきます</li>
          <li>焦点が合ったら、そのまま維持してください</li>
        </ol>
      ) : (
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
          <li>画面から40-50cm離れて座ります</li>
          <li>画像の手前に焦点を合わせるように、寄り目にします</li>
          <li>指を画面と目の中間に置き、その指に焦点を合わせると始めやすいです</li>
          <li>立体的な形が浮かび上がったら、そのまま維持してください</li>
        </ol>
      )}
    </div>
  );
}
