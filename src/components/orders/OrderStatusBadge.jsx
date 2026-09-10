import React from 'react';
import { Badge } from '../common/Badge';
import { Clock, Loader2, CheckCircle2, XCircle } from 'lucide-react';

const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    variant: 'warning',
    icon: Clock,
  },
  in_progress: {
    label: 'In Progress',
    variant: 'info',
    icon: Loader2,
  },
  completed: {
    label: 'Completed',
    variant: 'success',
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'Cancelled',
    variant: 'danger',
    icon: XCircle,
  },
};

export function OrderStatusBadge({ status = 'pending', size = 'sm', className }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} size={size} dot className={className}>
      <span className="flex items-center gap-1">
        {config.label}
      </span>
    </Badge>
  );
}
