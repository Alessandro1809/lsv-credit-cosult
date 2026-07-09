import { useMemo, useState } from 'react';
import './HeroProductSwitcher.css';

type ProductKey = 'personal' | 'card';

const whatsappLink = 'https://wa.link/zvpsjg';

type HeroProduct = {
	id: ProductKey;
	tabLabel: string;
	title: string;
	subtitle: string;
	primaryAction: string;
	primaryHref: string;
	secondaryAction: string;
	secondaryHref: string;
	legal: string;
	board: {
		label: string;
		headline: string;
		body: string;
		items: string[];
		accentLabel: string;
		accentTitle: string;
		accentText: string;
		details: Array<{
			label: string;
			title: string;
			text: string;
		}>;
	};
};

const products: HeroProduct[] = [
	{
		id: 'personal',
		tabLabel: 'Credito Personal',
		title: 'Crédito personal BCR con orientación clara desde el primer contacto',
		subtitle:
			'Conocé si podés calificar, qué datos necesitás y cómo iniciar tu solicitud de crédito personal.',
		primaryAction: 'Consultar ahora',
		primaryHref: '#contacto',
		secondaryAction: 'Ver requisitos',
		secondaryHref: '#requisitos',
		legal:
			'La aprobación, monto final y condiciones están sujetos al análisis crediticio, capacidad de pago, políticas del banco y normativa aplicable.',
		board: {
			label: 'Antes de iniciar',
			headline: 'Solicitar un crédito no tiene por qué ser complicado. Te guiamos paso a paso.',
			body: 'Referencia de cuota: ₡19.500 por mes por cada millón a 10 años aproximadamente.',
			items: [
				'Tasas de interés sujetas a evaluación.',
				'Abonos extraordinarios permitidos.',
				'Asesoría personalizada.',
			],
			accentLabel: 'Canal rápido',
			accentTitle: 'Consultar por WhatsApp',
			accentText: 'Teléfono: 61031947. Correo: ashsevilla@bancobcr.com',
			details: [
				{
					label: 'Plazo usual',
					title: '2 a 3 semanas',
					text: 'Tiempo habitual de análisis.',
				},
				{
					label: 'Tasas de interés',
					title: 'Tasa Fija',
					text: '5 años 17.20%, 8 años 18.10%, 10 años 18.50%',
				},
			],
		},
	},
	{
		id: 'card',
		tabLabel: 'Tarjeta de crédito',
		title: 'Tarjeta de crédito BCR para comprar con más seguridad',
		subtitle:
			'Disfrutá los beneficios de las tarjetas de crédito BCR con pagos digitales y seguridad 3DS para compras en línea.',
		primaryAction: 'Enviar correo',
		primaryHref: 'mailto:ashsevilla@bancobcr.com',
		secondaryAction: 'Consultar ahora',
		secondaryHref: '#contacto',
		legal:
			'La aprobación, límite final y condiciones están sujetos al análisis crediticio, continuidad laboral, autorización SUGEF y políticas vigentes del banco.',
		board: {
			label: 'Tasa mensual',
			headline: '2.71% de interés mensual.',
			body: 'Condiciones sujetas a políticas vigentes del banco.',
			items: [
				'Autorización SUGEF requerida.',
				'6 meses de continuidad laboral.',
				'Billeteras electrónicas para comprar con móvil Android o iOS.',
			],
			accentLabel: 'Contacto directo',
			accentTitle: 'Consultar por WhatsApp',
			accentText: 'Teléfono: 61031947. Correo: ashsevilla@bancobcr.com',
			details: [
				{
					label: 'Límite',
					title: 'Sujeto a capacidad de pago',
					text: 'Consulta para conocer el tuyo.',
				},
				{
					label: 'Seguridad',
					title: 'Tecnología 3DS',
					text: 'Código de seguridad para transacciones en línea.',
				},
			],
		},
	},
];

const tabOrder: ProductKey[] = ['personal', 'card'];

export default function HeroProductSwitcher() {
	const [activeProductId, setActiveProductId] = useState<ProductKey>('personal');
	const activeProduct = useMemo(
		() => products.find((product) => product.id === activeProductId) ?? products[0],
		[activeProductId],
	);

	const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, currentId: ProductKey) => {
		if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

		event.preventDefault();
		const currentIndex = tabOrder.indexOf(currentId);
		const direction = event.key === 'ArrowRight' ? 1 : -1;
		const nextIndex = (currentIndex + direction + tabOrder.length) % tabOrder.length;
		setActiveProductId(tabOrder[nextIndex]);
	};

	return (
		<section className="product-hero section-pad" aria-labelledby="hero-product-title">
			<div className="product-hero-copy reveal">
				<div className="product-tabs" role="tablist" aria-label="Tipo de producto">
					{products.map((product) => (
						<button
							key={product.id}
							type="button"
							id={`tab-${product.id}`}
							className="product-tab"
							role="tab"
							aria-selected={activeProduct.id === product.id}
							aria-controls={`panel-${product.id}`}
							tabIndex={activeProduct.id === product.id ? 0 : -1}
							onClick={() => setActiveProductId(product.id)}
							onKeyDown={(event) => handleTabKeyDown(event, product.id)}
						>
							{product.tabLabel}
						</button>
					))}
				</div>

				<div
					key={`${activeProduct.id}-copy`}
					id={`panel-${activeProduct.id}`}
					role="tabpanel"
					aria-labelledby={`tab-${activeProduct.id}`}
					className="product-copy-panel"
				>
					<h1 id="hero-product-title">{activeProduct.title}</h1>
					<p className="product-subtitle">{activeProduct.subtitle}</p>
					<div className="product-actions" aria-label="Acciones principales">
						<a className="hero-action hero-action-primary" href={activeProduct.primaryHref}>
							<span>{activeProduct.primaryAction}</span>
							<span className="hero-action-icon" aria-hidden="true">
								↗
							</span>
						</a>
						<a
							className="hero-action hero-action-secondary"
							href={activeProduct.secondaryHref}
							target={activeProduct.secondaryHref.startsWith('#') ? undefined : '_blank'}
							rel={activeProduct.secondaryHref.startsWith('#') ? undefined : 'noopener noreferrer'}
						>
							<span>{activeProduct.secondaryAction}</span>
							<span className="hero-action-icon" aria-hidden="true">
								{activeProduct.secondaryHref.startsWith('#') ? '↓' : '↗'}
							</span>
						</a>
					</div>
					<p className="product-legal">{activeProduct.legal}</p>
				</div>
			</div>

			<div key={`${activeProduct.id}-board`} className="product-board reveal delay-1" aria-label={`Datos destacados: ${activeProduct.tabLabel}`}>
				<div className="product-board-card product-board-main">
					<span>{activeProduct.board.label}</span>
					<strong>{activeProduct.board.headline}</strong>
					<p>{activeProduct.board.body}</p>
				</div>

				<div className="product-board-card product-board-list">
					<ul>
						{activeProduct.board.items.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</div>

				<div className="product-detail-stack">
					{activeProduct.board.details.map((detail) => (
						<div className="product-board-card product-detail" key={detail.label}>
							<span>{detail.label}</span>
							<strong>{detail.title}</strong>
							<p>{detail.text}</p>
						</div>
					))}
				</div>

				<div className="product-board-card product-board-accent">
					<span>{activeProduct.board.accentLabel}</span>
					<a href={whatsappLink} target="_blank" rel="noopener noreferrer">
						<span className="accent-link-text">Consultar por WhatsApp</span>
						<span className="accent-link-icon" aria-hidden="true">
							↗
						</span>
					</a>
					<p>{activeProduct.board.accentText}</p>
				</div>
			</div>
		</section>
	);
}
