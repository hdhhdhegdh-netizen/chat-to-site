import { HelpCircle, Keyboard } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const shortcuts = [
  { keys: ["Ctrl", "Enter"], description: "إرسال الرسالة" },
  { keys: ["Escape"], description: "إغلاق الشريط الجانبي" },
  { keys: ["Ctrl", "B"], description: "إظهار/إخفاء الشريط الجانبي" },
  { keys: ["Ctrl", "N"], description: "محادثة جديدة" },
  { keys: ["Ctrl", "P"], description: "نشر الموقع" },
];

const KeyboardShortcutsHelp = () => {
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <Keyboard className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent 
        side="bottom" 
        align="end"
        className="w-64 p-0"
      >
        <div className="p-3 border-b border-border">
          <div className="flex items-center gap-2 font-medium">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span>اختصارات لوحة المفاتيح</span>
          </div>
        </div>
        <div className="p-2 space-y-1">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-muted/50 transition-colors"
            >
              <span className="text-sm text-muted-foreground">
                {shortcut.description}
              </span>
              <div className="flex items-center gap-1" dir="ltr">
                {shortcut.keys.map((key, keyIndex) => (
                  <span key={keyIndex}>
                    <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted border border-border rounded shadow-sm">
                      {key}
                    </kbd>
                    {keyIndex < shortcut.keys.length - 1 && (
                      <span className="mx-0.5 text-muted-foreground">+</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default KeyboardShortcutsHelp;
