import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  Truck, 
  ShieldCheck, 
  ArrowLeft,
  Filter,
  Tag
} from 'lucide-react';
import { PRODUCTS } from '../../data/mockData';
import { TRANSLATIONS } from '../../data/translations';
import { OrderModal } from './OrderModal';

export function MarketplaceWidget({ farmData, recommendedProductIds, lang = 'en' }) {
  const t = TRANSLATIONS[lang];
  const [selectedCategory, setSelectedCategory] = useState(
    recommendedProductIds && recommendedProductIds.length > 0 ? 'recommended' : 'all'
  );
  const [selectedProductForOrder, setSelectedProductForOrder] = useState(null);

  // Filter products
  const filteredProducts = PRODUCTS.filter((prod) => {
    if (selectedCategory === 'recommended') {
      if (recommendedProductIds && recommendedProductIds.length > 0) {
        return recommendedProductIds.includes(prod.id);
      }
      return prod.badge.includes('بياض') || prod.recommendedFor.includes('البياض');
    }
    if (selectedCategory === 'milano') {
      return prod.supplier.includes('ميلانو') || prod.supplier.includes('Milano');
    }
    if (selectedCategory === 'fungicide') {
      return prod.category.includes('فطرية') || prod.category.includes('أصداء') || prod.category.includes('Fungicide');
    }
    return true;
  });

  return (
    <div className="relative rounded-2xl bg-[#0A0A0A] border border-[#222226] p-6 sm:p-7 shadow-[0_0_25px_rgba(178,123,255,0.08)] flex flex-col justify-between space-y-6">
      
      {/* Header with generous spacing */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B27BFF]/10 border border-[#B27BFF]/30 flex items-center justify-center text-[#B27BFF] shadow-[0_0_10px_rgba(178,123,255,0.2)]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white leading-snug">{t.widgetMarketTitle}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B27BFF]/15 text-[#B27BFF] border border-[#B27BFF]/30 font-medium">
                  B2B / B2C
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF] mt-0.5">
                {t.widgetMarketSub}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.genuineBadge}</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#B27BFF] text-black font-bold shadow-[0_0_10px_#B27BFF]'
                : 'bg-[#000000] border border-[#222226] text-[#9CA3AF] hover:text-white'
            }`}
          >
            {t.filterAll} ({PRODUCTS.length})
          </button>

          <button
            onClick={() => setSelectedCategory('recommended')}
            className={`px-3.5 py-2 rounded-lg whitespace-nowrap font-medium transition-all flex items-center gap-1.5 ${
              selectedCategory === 'recommended'
                ? 'bg-[#B27BFF] text-black font-bold shadow-[0_0_10px_#B27BFF]'
                : 'bg-[#000000] border border-[#222226] text-[#9CA3AF] hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{t.filterRecommended}</span>
          </button>

          <button
            onClick={() => setSelectedCategory('milano')}
            className={`px-3.5 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
              selectedCategory === 'milano'
                ? 'bg-[#B27BFF] text-black font-bold shadow-[0_0_10px_#B27BFF]'
                : 'bg-[#000000] border border-[#222226] text-[#9CA3AF] hover:text-white'
            }`}
          >
            {t.filterMilano}
          </button>

          <button
            onClick={() => setSelectedCategory('fungicide')}
            className={`px-3.5 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
              selectedCategory === 'fungicide'
                ? 'bg-[#B27BFF] text-black font-bold shadow-[0_0_10px_#B27BFF]'
                : 'bg-[#000000] border border-[#222226] text-[#9CA3AF] hover:text-white'
            }`}
          >
            {t.filterFungicides}
          </button>
        </div>

        {/* Products Grid / Cards */}
        <div className="space-y-3.5">
          {filteredProducts.map((product) => {
            const isDiagnosedMatch = recommendedProductIds?.includes(product.id);

            return (
              <div
                key={product.id}
                className={`p-4 rounded-xl border transition-all duration-300 relative group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isDiagnosedMatch
                    ? 'bg-[#B27BFF]/5 border-[#B27BFF] shadow-[0_0_15px_rgba(178,123,255,0.15)]'
                    : 'bg-[#000000] border-[#1F1F24] hover:border-[#B27BFF]/40'
                }`}
              >
                {/* Product Info & Thumbnail */}
                <div className="flex items-start gap-3.5 w-full sm:w-auto">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#0A0A0A] border border-[#222226] flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-1 right-1 bg-black/80 px-1 py-0.5 rounded text-[9px] font-mono text-white">
                      {product.stock}
                    </div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B27BFF]/15 text-[#B27BFF] font-medium border border-[#B27BFF]/30">
                        {product.category}
                      </span>
                      {product.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-[#B27BFF] transition-colors leading-snug">
                      {product.name}
                    </h4>

                    <div className="text-[11px] text-[#9CA3AF] flex items-center gap-2">
                      <span className="text-[#B27BFF]/90 font-medium">{product.supplier}</span>
                      <span>•</span>
                      <span>{product.unit}</span>
                    </div>

                    <div className="text-[10px] text-gray-400 flex items-center gap-1">
                      <span className="text-emerald-400">{t.suitableForLabel}</span>
                      <span>{product.recommendedFor}</span>
                    </div>
                  </div>
                </div>

                {/* Price and Action Button */}
                <div className="flex items-center justify-between sm:flex-col sm:items-end w-full sm:w-auto border-t sm:border-t-0 border-[#1F1F24] pt-3 sm:pt-0">
                  <div className="text-start sm:text-end">
                    <div className="text-lg font-black text-white font-mono flex items-baseline gap-1.5">
                      <span>{product.price}</span>
                      <span className="text-xs font-normal text-[#B27BFF]">EGP</span>
                      <span className="text-xs text-gray-500 line-through mr-1">{product.originalPrice}</span>
                    </div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1 sm:justify-end mt-0.5">
                      <Truck className="w-3 h-3" />
                      <span>{product.deliveryDays}</span>
                    </div>
                  </div>

                  {/* Buy Now Button */}
                  <button
                    onClick={() => setSelectedProductForOrder(product)}
                    className="mt-2 px-5 py-2 rounded-xl font-bold text-xs text-black bg-[#B27BFF] hover:bg-[#9E5FF5] transition-all duration-300 shadow-[0_0_12px_#B27BFF] hover:shadow-[0_0_20px_#B27BFF] flex items-center gap-1.5 transform active:scale-95"
                  >
                    <span>{t.btnBuyNow}</span>
                    <ShoppingBag className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Widget Footer */}
      <div className="pt-3 border-t border-[#1F1F24] flex items-center justify-between text-[11px] text-[#9CA3AF]">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.authorizedAgentsBadge}</span>
        </span>
        <span className="text-[#B27BFF]">{t.discountBadge}</span>
      </div>

      {/* Interactive Order Modal */}
      {selectedProductForOrder && (
        <OrderModal 
          product={selectedProductForOrder}
          farmData={farmData}
          onClose={() => setSelectedProductForOrder(null)}
          lang={lang}
        />
      )}

    </div>
  );
}
