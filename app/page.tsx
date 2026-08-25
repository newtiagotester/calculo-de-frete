'use client';

import { useMemo, useState } from 'react';

type Region = 'sul' | 'sudeste' | 'centro-oeste' | 'norte' | 'nordeste';
type Delivery = 'normal' | 'expressa';

const regionRates: Record<Region, number> = { sul: 10, sudeste: 10, 'centro-oeste': 15, norte: 20, nordeste: 20 };
const regionLabels: Record<Region, string> = { sul: 'Sul', sudeste: 'Sudeste', 'centro-oeste': 'Centro-Oeste', norte: 'Norte', nordeste: 'Nordeste' };
const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export default function Home() {
  const [weight, setWeight] = useState(3);
  const [region, setRegion] = useState<Region>('sudeste');
  const [delivery, setDelivery] = useState<Delivery>('normal');

  const quote = useMemo(() => {
    const safeWeight = Number.isFinite(weight) ? Math.max(0, weight) : 0;
    const base = regionRates[region];
    const extraWeight = Math.max(0, safeWeight - 5);
    const weightFee = extraWeight * 2;
    const subtotal = base + weightFee;
    const expressFee = delivery === 'expressa' ? subtotal * 0.5 : 0;
    return { base, extraWeight, weightFee, expressFee, total: subtotal + expressFee };
  }, [weight, region, delivery]);

  return (
    <main className="site-shell">
      <nav className="topbar" aria-label="Navegação principal">
        <a className="brand" href="#inicio" aria-label="Rota Certa — início">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span>rota<span>certa</span></span>
        </a>
        <span className="nav-note">Simulador educacional de frete</span>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Cálculo simples, resultado na hora</p>
          <h1>Descubra o valor do seu <em>frete.</em></h1>
          <p className="hero-description">Informe os dados da entrega e veja um orçamento claro, sem letras miúdas.</p>
          <div className="route-line" aria-hidden="true">
            <span className="route-dot active" />
            <span className="route-track"><i /><i /><i /></span>
            <span className="route-dot finish" />
          </div>
          <div className="route-labels" aria-hidden="true"><span>Origem</span><span>Seu destino</span></div>
        </div>

        <section className="calculator" aria-labelledby="calculator-title">
          <div className="card-heading">
            <div><p>Faça uma simulação</p><h2 id="calculator-title">Calcule seu frete</h2></div>
            <span className="parcel-icon" aria-hidden="true"><i /></span>
          </div>

          <div className="form-grid">
            <label className="field weight-field">
              <span>Peso da encomenda</span>
              <span className="input-wrap">
                <input type="number" min="0.1" step="0.1" value={Number.isFinite(weight) ? weight : ''} onChange={(event) => setWeight(event.target.valueAsNumber)} aria-describedby="weight-help" />
                <b>kg</b>
              </span>
              <small id="weight-help">Até 5 kg, sem taxa adicional</small>
            </label>

            <label className="field">
              <span>Região de destino</span>
              <span className="select-wrap">
                <select value={region} onChange={(event) => setRegion(event.target.value as Region)}>
                  {Object.entries(regionLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </span>
            </label>
          </div>

          <fieldset className="delivery-field">
            <legend>Tipo de entrega</legend>
            <div className="delivery-options">
              <label className={delivery === 'normal' ? 'selected' : ''}>
                <input type="radio" name="delivery" value="normal" checked={delivery === 'normal'} onChange={() => setDelivery('normal')} />
                <span className="radio-ui" /><span><b>Normal</b><small>Melhor custo-benefício</small></span>
              </label>
              <label className={delivery === 'expressa' ? 'selected' : ''}>
                <input type="radio" name="delivery" value="expressa" checked={delivery === 'expressa'} onChange={() => setDelivery('expressa')} />
                <span className="radio-ui" /><span><b>Expressa</b><small>+ 50% sobre o total</small></span>
              </label>
            </div>
          </fieldset>

          <div className="summary" aria-live="polite">
            <div className="summary-title"><span>Resumo do cálculo</span><span className="summary-region">{regionLabels[region]}</span></div>
            <dl>
              <div><dt>Tarifa da região</dt><dd>{money.format(quote.base)}</dd></div>
              <div><dt>Peso adicional {quote.extraWeight > 0 && <small>({quote.extraWeight.toLocaleString('pt-BR')} kg × R$ 2)</small>}</dt><dd>{money.format(quote.weightFee)}</dd></div>
              {delivery === 'expressa' && <div><dt>Adicional expresso <small>(50%)</small></dt><dd>{money.format(quote.expressFee)}</dd></div>}
            </dl>
            <div className="total-row"><span><small>Valor estimado</small><b>Total do frete</b></span><strong>{money.format(quote.total)}</strong></div>
          </div>

          <p className="instant-note"><span aria-hidden="true">✓</span> O valor é atualizado automaticamente</p>
        </section>
      </section>

      <footer><p>Projeto educacional <span>•</span> Valores simulados</p><p>Transparência em cada quilômetro.</p></footer>
    </main>
  );
}
