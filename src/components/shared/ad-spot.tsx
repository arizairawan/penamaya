import { Card } from '@/components/ui/card';

export function AdSpot() {
  return (
    <Card className="h-64 flex items-center justify-center p-4">
      <div className="text-center text-muted-foreground">
        <p className="font-semibold">Advertisement</p>
        <p className="text-sm">300 x 250</p>
      </div>
    </Card>
  );
}
