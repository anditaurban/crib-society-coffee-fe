import React, { useState } from 'react';
import {
  Settings,
  Store,
  Receipt,
  Percent,
  Clock,
  Printer,
  Save,
  RotateCcw,
  CheckCircle2,
  Bell,
  Wifi,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../context/ToastContext';

export function OwnerSettingsPage() {
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState({
    storeName: 'Crib Society Coffee & Roasters',
    tagline: 'A Rebellious Coffee Sanctum & Creative Hub',
    address: 'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan 12190',
    phone: '+62 812-9988-7766',
    email: 'hello@cribsociety.com',
    instagram: '@cribsociety.id',
    wifiSsid: 'crib_society',
    wifiPass: 'rebelcoffee2024',
    taxRate: 10,
    serviceChargeRate: 0,
    enableServiceCharge: false,
    weekdayHours: '07:00 – 23:00 WIB',
    weekendHours: '07:00 – 00:00 WIB',
    receiptHeader: 'CRIB SOCIETY COFFEE & ROASTERY',
    receiptFooter: 'Thank you for stopping by • Keep brewing rebellion',
    soundAlerts: true,
    autoPrintReceipt: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Store & operational settings saved successfully!', 'success');
    }, 600);
  };

  const handleReset = () => {
    showToast('Settings reverted to defaults.', 'neutral');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-crib-border/60">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-crib-red" />
            <h1 className="text-xl sm:text-2xl font-black font-display text-crib-cream tracking-tight uppercase">
              Store &amp; Operational Settings
            </h1>
            <Badge variant="neutral" size="sm">
              Configuration
            </Badge>
          </div>
          <p className="text-xs text-crib-warm-gray mt-0.5">
            Configure store profile, PB1 tax rates, register receipts, and operating hours.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="md"
            onClick={handleReset}
            leftIcon={RotateCcw}
            className="text-xs font-mono"
          >
            Reset
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
            isLoading={isSaving}
            leftIcon={Save}
            className="text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-950/40"
          >
            Save All Changes
          </Button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Store Identity */}
        <div className="p-5 rounded-2xl bg-crib-charcoal border border-crib-border space-y-4">
          <div className="flex items-center gap-2 border-b border-crib-border/60 pb-3">
            <Store className="w-4 h-4 text-crib-red" />
            <h2 className="text-sm font-bold font-display uppercase tracking-wider text-crib-cream">
              Flagship Store Profile
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
                Store Name
              </label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full bg-crib-ink border border-crib-border rounded-xl px-3.5 py-2 text-xs text-crib-cream focus:outline-none focus:border-crib-red"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full bg-crib-ink border border-crib-border rounded-xl px-3.5 py-2 text-xs text-crib-cream focus:outline-none focus:border-crib-red"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
                Full Physical Address
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-crib-ink border border-crib-border rounded-xl px-3.5 py-2 text-xs text-crib-cream focus:outline-none focus:border-crib-red"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
                Hotline Phone / WhatsApp
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full bg-crib-ink border border-crib-border rounded-xl px-3.5 py-2 text-xs text-crib-cream focus:outline-none focus:border-crib-red font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
                Instagram Handle
              </label>
              <input
                type="text"
                value={settings.instagram}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                className="w-full bg-crib-ink border border-crib-border rounded-xl px-3.5 py-2 text-xs text-crib-cream focus:outline-none focus:border-crib-red font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Tax & Financials */}
        <div className="p-5 rounded-2xl bg-crib-charcoal border border-crib-border space-y-4">
          <div className="flex items-center gap-2 border-b border-crib-border/60 pb-3">
            <Percent className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold font-display uppercase tracking-wider text-crib-cream">
              Tax &amp; Service Charges
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
                PB1 Restaurant Tax Rate (%)
              </label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
                className="w-full bg-crib-ink border border-crib-border rounded-xl px-3.5 py-2 text-xs font-mono text-crib-cream focus:outline-none focus:border-crib-red"
              />
              <span className="text-[10px] text-crib-warm-gray mt-1 block">
                Standard Indonesian local restaurant tax (10%).
              </span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
                Service Charge (%)
              </label>
              <input
                type="number"
                disabled={!settings.enableServiceCharge}
                value={settings.serviceChargeRate}
                onChange={(e) => setSettings({ ...settings, serviceChargeRate: Number(e.target.value) })}
                className="w-full bg-crib-ink border border-crib-border rounded-xl px-3.5 py-2 text-xs font-mono text-crib-cream focus:outline-none focus:border-crib-red disabled:opacity-50"
              />
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="enableServiceCharge"
                  checked={settings.enableServiceCharge}
                  onChange={(e) => setSettings({ ...settings, enableServiceCharge: e.target.checked })}
                  className="rounded border-crib-border bg-crib-ink text-crib-red focus:ring-crib-red"
                />
                <label htmlFor="enableServiceCharge" className="text-xs text-crib-warm-gray select-none">
                  Enable optional dine-in service charge
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Receipt Template & Customer Wifi */}
        <div className="p-5 rounded-2xl bg-crib-charcoal border border-crib-border space-y-4">
          <div className="flex items-center gap-2 border-b border-crib-border/60 pb-3">
            <Receipt className="w-4 h-4 text-sky-400" />
            <h2 className="text-sm font-bold font-display uppercase tracking-wider text-crib-cream">
              Thermal Receipt &amp; Wifi Credentials
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
                Receipt Header Slip
              </label>
              <input
                type="text"
                value={settings.receiptHeader}
                onChange={(e) => setSettings({ ...settings, receiptHeader: e.target.value })}
                className="w-full bg-crib-ink border border-crib-border rounded-xl px-3.5 py-2 text-xs text-crib-cream font-mono focus:outline-none focus:border-crib-red"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
                Receipt Footer Motto
              </label>
              <input
                type="text"
                value={settings.receiptFooter}
                onChange={(e) => setSettings({ ...settings, receiptFooter: e.target.value })}
                className="w-full bg-crib-ink border border-crib-border rounded-xl px-3.5 py-2 text-xs text-crib-cream font-mono focus:outline-none focus:border-crib-red"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
                Customer Wifi SSID
              </label>
              <input
                type="text"
                value={settings.wifiSsid}
                onChange={(e) => setSettings({ ...settings, wifiSsid: e.target.value })}
                className="w-full bg-crib-ink border border-crib-border rounded-xl px-3.5 py-2 text-xs text-crib-cream font-mono focus:outline-none focus:border-crib-red"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-crib-warm-gray mb-1">
                Customer Wifi Password
              </label>
              <input
                type="text"
                value={settings.wifiPass}
                onChange={(e) => setSettings({ ...settings, wifiPass: e.target.value })}
                className="w-full bg-crib-ink border border-crib-border rounded-xl px-3.5 py-2 text-xs text-crib-cream font-mono focus:outline-none focus:border-crib-red"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <Button
            variant="primary"
            size="lg"
            type="submit"
            isLoading={isSaving}
            leftIcon={Save}
            className="shadow-xl shadow-red-950/50"
          >
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
