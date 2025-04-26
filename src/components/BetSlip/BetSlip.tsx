
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BetSlip = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Fogadási szelvény</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Még nincs kiválasztott fogadás
          </div>
          <Button className="w-full" disabled>
            Fogadás leadása
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BetSlip;
