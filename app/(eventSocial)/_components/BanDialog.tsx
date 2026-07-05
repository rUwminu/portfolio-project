"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BanDialogProps {
  action: "ban" | "unban";
  eventName: string;
  submitting: boolean;
  onConfirm: (reason: string) => void;
  onClose: () => void;
}

/** Overlay prompt for the admin ban/unban reason (required for ban, optional for unban). */
const BanDialog = ({
  action,
  eventName,
  submitting,
  onConfirm,
  onClose,
}: BanDialogProps) => {
  const [reason, setReason] = useState("");
  const reasonRequired = action === "ban";
  const reasonInvalid = reason.trim().length > 0 && reason.trim().length < 3;
  const canSubmit =
    !submitting &&
    !reasonInvalid &&
    (!reasonRequired || reason.trim().length >= 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl bg-white border-0 p-5 shadow-xl">
        <h3 className="text-base font-semibold capitalize">{action} event</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          You are about to {action}{" "}
          <span className="font-medium">{eventName}</span>.
        </p>

        <div className="mt-4 space-y-1.5">
          <Label htmlFor="ban-reason">
            Reason{reasonRequired ? "" : " (optional)"}
          </Label>
          <Textarea
            id="ban-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={
              action === "ban"
                ? "e.g. Violates community guidelines"
                : "e.g. Appeal accepted"
            }
            rows={3}
          />
          {reasonInvalid && (
            <p className="text-xs text-destructive">
              Reason must be at least 3 characters.
            </p>
          )}
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button
            variant={action === "ban" ? "destructive" : "secondary"}
            disabled={!canSubmit}
            onClick={() => onConfirm(reason.trim())}
          >
            {submitting ? "Working…" : `Confirm ${action}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BanDialog;
