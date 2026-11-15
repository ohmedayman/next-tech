import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShoppingBag, 
  Truck, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { TRANSLATIONS } from '../../data/translations';

export function OrderModal({ product, farmData, onClose, lang = 'en' }) {
  const t = TRANSLATIONS[lang];
  const [quantity, setQuantity] = useState(2);
  const [phone, setPhone] = useState('01012345678');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');

  const totalPrice = product ? product.price * quantity : 0;

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    const randomId = 'NX-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setIsOrdered(true);
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0A0A0A] border border-[#B27BFF]/40 p-6 sm:p-8 shadow-[0_0_40px_rgba(178,123,255,0.25)] text-start space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#141414] text-[#9CA3AF] hover:text-white hover:border-[#B27BFF] border border-[#222226] transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {!isOrdered ? (
          <div className="space-y-6">
            {/* Modal Header */}
            <div className="flex items-center gap-3 border-b border-[#1F1F24] pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#B27BFF]/15 border border-[#B27BFF]/30 flex items-center justify-center text-[#B27BFF] flex-shrink-0">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white leading-snug">{t.modalOrderTitle}</h3>
                <p className="text-xs text-[#9CA3AF] mt-0.5">
                  {t.modalOrderSub} {product.supplier}
                </p>
              </div>
            </div>

            {/* Product Summary */}
            <div className="p-4 rounded-xl bg-[#000000] border border-[#222226] flex items-center gap-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-16 h-16 rounded-lg object-cover border border-[#222226] flex-shrink-0"
              />
              <div className="flex-1 space-y-1">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B27BFF]/15 text-[#B27BFF] font-medium">
                  {product.category}
                </span>
                <h4 className="text-sm font-bold text-white leading-snug">{product.name}</h4>
                <div className="text-xs text-[#9CA3AF]">{product.unit}</div>
                <div className="text-sm font-black text-[#B27BFF] font-mono">
                  {product.price} EGP <span className="text-[11px] text-gray-500 line-through">{product.originalPrice} EGP</span>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <form onSubmit={handleConfirmOrder} className="space-y-4">
              
              {/* Quantity selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#9CA3AF]">
                  {t.lblQuantity}
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#222226] rounded-xl bg-[#000000] p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-[#141414] text-white font-bold flex items-center justify-center hover:bg-[#B27BFF] hover:text-black transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-sm font-bold font-mono text-white">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-[#141414] text-white font-bold flex items-center justify-center hover:bg-[#B27BFF] hover:text-black transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-[#9CA3AF]">
                    {t.quantityAcreCoverage} {quantity * 3} {t.acresUnit}
                  </span>
                </div>
              </div>

              {/* Delivery location info */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#9CA3AF]">
                  {t.lblDeliveryAddress}
                </label>
                <div className="p-3 rounded-xl bg-[#000000] border border-[#222226] text-xs text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#B27BFF] flex-shrink-0" />
                  <span>
                    {farmData?.farmName || 'Farm'} - {farmData?.locationName || 'Fayoum'} ({farmData?.size || 15} {t.acresUnit})
                  </span>
                </div>
              </div>

              {/* Phone number */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#9CA3AF]">
                  {t.lblPhoneNumber}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-[#000000] border border-[#222226] text-white text-xs font-mono focus:border-[#B27BFF] focus:outline-none"
                    placeholder="010xxxxxxxxx"
                  />
                  <Phone className="w-4 h-4 text-[#9CA3AF] absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Total Calculation */}
              <div className="p-3.5 rounded-xl bg-[#121215] border border-[#1F1F24] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#9CA3AF]">{t.orderTotalLabel}</span>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                    <Truck className="w-3 h-3" />
                    <span>{t.freeShippingBadge}</span>
                  </div>
                </div>
                <div className="text-xl font-black text-[#B27BFF] font-mono">
                  {totalPrice} EGP
                </div>
              </div>

              {/* Confirm Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-black bg-[#B27BFF] hover:bg-[#9E5FF5] transition-all duration-300 shadow-[0_0_15px_#B27BFF] hover:shadow-[0_0_25px_#B27BFF] flex items-center justify-center gap-2"
              >
                <span>{t.btnConfirmOrder}</span>
                <Truck className="w-4 h-4 text-black" />
              </button>

            </form>
          </div>
        ) : (
          /* Order Placed Success Confirmation */
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white leading-snug">
                {t.orderSuccessTitle}
              </h3>
              <p className="text-xs text-[#9CA3AF]">
                {t.trackingIdLabel} <span className="text-[#B27BFF] font-mono font-bold">{orderId}</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#000000] border border-[#1F1F24] text-xs text-start space-y-2.5">
              <div className="flex justify-between">
                <span className="text-[#9CA3AF]">{t.productLabel}</span>
                <span className="text-white font-bold">{product.name} (x{quantity})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9CA3AF]">{t.supplierLabel}</span>
                <span className="text-[#B27BFF]">{product.supplier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9CA3AF]">{t.estArrivalLabel}</span>
                <span className="text-emerald-400 font-bold">{t.estArrivalVal}</span>
              </div>
              <div className="flex justify-between border-t border-[#1F1F24] pt-2">
                <span className="text-[#9CA3AF]">{t.paymentMethodLabel}</span>
                <span className="text-white">{t.paymentMethodVal}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs text-black bg-[#B27BFF] hover:bg-[#9E5FF5] transition-all shadow-[0_0_12px_#B27BFF]"
            >
              {t.btnReturnDashboard}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
