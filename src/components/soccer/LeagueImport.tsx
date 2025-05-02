
import { useState } from 'react';
import { Upload, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { parseMatchesCsv } from '@/lib/league-calculator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LeagueImportProps {
  leagueId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function LeagueImport({ leagueId, isOpen, onClose }: LeagueImportProps) {
  const [csvText, setCsvText] = useState('');
  const [importStatus, setImportStatus] = useState<{
    success?: boolean;
    message?: string;
    errors?: string[];
  }>({});
  
  const { addMatches } = useAppStore();
  
  const handleImport = () => {
    if (!csvText.trim()) {
      setImportStatus({
        success: false,
        message: "Please enter CSV data"
      });
      return;
    }
    
    const { matches, errors } = parseMatchesCsv(csvText, leagueId);
    
    if (errors.length > 0) {
      setImportStatus({
        success: false,
        message: "Import failed with errors",
        errors
      });
      return;
    }
    
    if (matches.length === 0) {
      setImportStatus({
        success: false,
        message: "No valid matches found in the CSV data"
      });
      return;
    }
    
    // Add matches to store
    addMatches(matches);
    
    setImportStatus({
      success: true,
      message: `Successfully imported ${matches.length} matches`
    });
    
    // Reset form
    setCsvText('');
    
    // Close modal after 2 seconds
    setTimeout(() => {
      onClose();
      setImportStatus({});
    }, 2000);
  };
  
  const handleClose = () => {
    setCsvText('');
    setImportStatus({});
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] glass-effect">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Matches from CSV
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {importStatus.message && (
            <Alert variant={importStatus.success ? "default" : "destructive"}>
              <div className="flex items-center gap-2">
                {importStatus.success ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
                <AlertDescription>
                  {importStatus.message}
                </AlertDescription>
              </div>
              
              {importStatus.errors && importStatus.errors.length > 0 && (
                <div className="mt-2 text-sm space-y-1 max-h-32 overflow-y-auto">
                  {importStatus.errors.map((error, index) => (
                    <div key={index} className="text-xs">• {error}</div>
                  ))}
                </div>
              )}
            </Alert>
          )}
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Paste your CSV data below. The CSV should include columns for: home team, away team, round, date, and optionally home score, away score, and venue.
            </p>
            
            <div className="bg-muted/30 p-3 rounded-md text-xs font-mono overflow-x-auto">
              <code>home,away,round,date,homeScore,awayScore,venue</code>
            </div>
            
            <Textarea
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder="Paste CSV content here..."
              className="min-h-[200px] font-mono"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleImport}>
              {importStatus.success ? 'Imported!' : 'Import Matches'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
