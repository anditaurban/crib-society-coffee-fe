import React, { useState, useEffect, useCallback } from 'react';
import {
  Users,
  Plus,
  Search,
  Edit2,
  Shield,
  UserCheck,
  RotateCcw,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { staffService } from '../../services/staffService';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { LoadingState } from '../../components/feedback/LoadingState';
import { useToast } from '../../context/ToastContext';
import { cn } from '../../utils/cn';

export function OwnerStaffPage() {
  const { showToast } = useToast();

  const [staffList, setStaffList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleTitle: 'Barista',
    shift: 'Morning (07:00 - 15:00)',
    status: 'active',
  });

  const loadStaff = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await staffService.getStaff();
      setStaffList(res.data || []);
    } catch (err) {
      showToast('Failed to load staff roster.', 'danger');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadStaff();
  }, [loadStaff]);

  const handleOpenCreate = () => {
    setEditingStaff(null);
    setFormData({
      name: '',
      email: '',
      roleTitle: 'Barista',
      shift: 'Morning (07:00 - 15:00)',
      status: 'active',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (staff) => {
    setEditingStaff(staff);
    setFormData({
      name: staff.name,
      email: staff.email,
      roleTitle: staff.roleTitle,
      shift: staff.shift,
      status: staff.status,
    });
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (staff) => {
    const nextStatus = staff.status === 'active' ? 'inactive' : 'active';
    try {
      await staffService.updateStaffStatus(staff.id, nextStatus);
      showToast(`Staff member status changed to ${nextStatus}.`, 'success');
      loadStaff();
    } catch (err) {
      showToast('Failed to update status.', 'danger');
    }
  };

  const handleSaveStaff = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      showToast('Name and email are required.', 'warning');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      showToast('Please provide a valid employee email address.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingStaff) {
        await staffService.updateStaff(editingStaff.id, formData);
        showToast(`Updated ${formData.name} successfully.`, 'success');
      } else {
        await staffService.createStaff(formData);
        showToast(`Added ${formData.name} to the team roster.`, 'success');
      }
      setIsModalOpen(false);
      loadStaff();
    } catch (err) {
      showToast(err.message || 'Failed to save staff.', 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredStaff = staffList.filter((s) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.roleTitle?.toLowerCase().includes(q)
    );
  });

  const activeCount = staffList.filter((s) => s.status === 'active').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-crib-border/60">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-crib-red" />
            <h1 className="text-xl sm:text-2xl font-black font-display text-crib-cream tracking-tight uppercase">
              Staff Access &amp; Administration
            </h1>
            <Badge variant="neutral" size="sm">
              {staffList.length} Accounts
            </Badge>
          </div>
          <p className="text-xs text-crib-warm-gray mt-0.5">
            Manage team assignments, shift rosters, and terminal credentials.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleOpenCreate}
          leftIcon={Plus}
          className="text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-950/40"
        >
          Add Team Member
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-crib-charcoal border border-crib-border">
          <span className="text-xs uppercase font-mono tracking-wider text-crib-warm-gray block">
            Active Staff
          </span>
          <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
            {activeCount} of {staffList.length}
          </div>
          <span className="text-[11px] text-crib-warm-gray font-mono">
            Permitted for register &amp; queue access
          </span>
        </div>

        <div className="p-4 rounded-xl bg-crib-charcoal border border-crib-border">
          <span className="text-xs uppercase font-mono tracking-wider text-crib-warm-gray block">
            Current Shift
          </span>
          <div className="text-2xl font-black font-mono text-crib-cream mt-1">
            Morning (07:00 – 15:00)
          </div>
          <span className="text-[11px] text-crib-red font-mono">
            2 Baristas on duty
          </span>
        </div>

        <div className="p-4 rounded-xl bg-crib-charcoal border border-crib-border">
          <span className="text-xs uppercase font-mono tracking-wider text-crib-warm-gray block">
            Access Role Level
          </span>
          <div className="text-2xl font-black font-mono text-crib-cream mt-1">
            Role: Staff
          </div>
          <span className="text-[11px] text-crib-warm-gray font-mono">
            Limited to POS &amp; Order Queue
          </span>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex justify-between items-center">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-crib-warm-gray absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, role, email..."
            className="w-full bg-crib-charcoal border border-crib-border rounded-xl pl-8 pr-4 py-2 text-xs text-crib-cream placeholder:text-crib-warm-gray/60 focus:outline-none focus:border-crib-red"
          />
        </div>
      </div>

      {/* Staff Table */}
      {isLoading ? (
        <div className="py-20 flex items-center justify-center">
          <LoadingState message="Loading team roster..." />
        </div>
      ) : (
        <div className="rounded-2xl border border-crib-border bg-crib-charcoal overflow-hidden shadow-elevated">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono min-w-[600px]">
              <thead className="bg-crib-ink/90 text-crib-warm-gray uppercase tracking-wider text-[10px] border-b border-crib-border">
              <tr>
                <th className="py-3.5 px-4 font-bold">Employee</th>
                <th className="py-3.5 px-4 font-bold">Role Title</th>
                <th className="py-3.5 px-4 font-bold">Shift</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-crib-border/50 text-crib-cream">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-crib-ink/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-sans font-bold text-sm text-crib-cream">
                      {staff.name}
                    </div>
                    <div className="text-[11px] text-crib-warm-gray">{staff.email}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-sans font-semibold text-crib-cream">
                      {staff.roleTitle}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-crib-warm-gray">
                    {staff.shift}
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge
                      variant={staff.status === 'active' ? 'success' : 'neutral'}
                      size="sm"
                      dot
                    >
                      {staff.status}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(staff)}
                        className={cn(
                          'px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-colors',
                          staff.status === 'active'
                            ? 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                            : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60 hover:bg-emerald-900/70'
                        )}
                      >
                        {staff.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenEdit(staff)}
                        className="p-1.5 rounded-lg bg-crib-ink border border-crib-border hover:border-crib-warm-gray text-crib-cream"
                        title="Edit Staff"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStaff ? 'Edit Staff Member' : 'Add Team Member'}
        description="Configure staff credentials and assigned shifts."
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSaveStaff} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Maya Roaster"
              className="w-full bg-crib-ink border border-crib-border rounded-xl px-3.5 py-2 text-xs text-crib-cream focus:outline-none focus:border-crib-red"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="maya@cribsociety.com"
              className="w-full bg-crib-ink border border-crib-border rounded-xl px-3.5 py-2 text-xs text-crib-cream focus:outline-none focus:border-crib-red"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
                Role Title
              </label>
              <select
                value={formData.roleTitle}
                onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                className="w-full bg-crib-ink border border-crib-border rounded-xl px-3 py-2 text-xs text-crib-cream focus:outline-none focus:border-crib-red"
              >
                <option value="Head Barista">Head Barista</option>
                <option value="Barista">Barista</option>
                <option value="Cashier / POS Lead">Cashier / POS Lead</option>
                <option value="Roaster & Inventory">Roaster &amp; Inventory</option>
                <option value="Barista Trainee">Barista Trainee</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
                Shift Schedule
              </label>
              <select
                value={formData.shift}
                onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                className="w-full bg-crib-ink border border-crib-border rounded-xl px-3 py-2 text-xs text-crib-cream focus:outline-none focus:border-crib-red"
              >
                <option value="Morning (07:00 - 15:00)">Morning (07:00 - 15:00)</option>
                <option value="Afternoon (14:00 - 22:00)">Afternoon (14:00 - 22:00)</option>
                <option value="Night (16:00 - 00:00)">Night (16:00 - 00:00)</option>
                <option value="Off">Off</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
              Account Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full bg-crib-ink border border-crib-border rounded-xl px-3 py-2 text-xs text-crib-cream focus:outline-none focus:border-crib-red"
            >
              <option value="active">Active (Access Enabled)</option>
              <option value="inactive">Inactive (Suspended)</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-crib-border/60">
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              type="submit"
              isLoading={isSubmitting}
            >
              {editingStaff ? 'Save Changes' : 'Add Employee'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
