import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface ClearDataDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onClearData: () => void;
}

export function ClearDataDialog({ isOpen, onClose, onClearData }: ClearDataDialogProps) {
  const { t } = useTranslation();
  
  const handleClearData = () => {
    onClearData();
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('clearConfirmTitle')}</DialogTitle>
          <DialogDescription>
            {t('clearConfirmMessage')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button variant="destructive" onClick={handleClearData}>
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}