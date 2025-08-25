"use client";

export default function Testimonials() {
  const depoimentos = [
    {
      nome: "Mariana Silva",
      texto:
        "O Dr. Felipe me atendeu com muita atenção e profissionalismo. Sempre explicou cada detalhe do processo e me deixou segura em todas as etapas.",
    },
    {
      nome: "João Paulo",
      texto:
        "Excelente advogado, sempre disponível para tirar dúvidas e muito preparado. Recomendo fortemente para quem precisa de uma defesa séria.",
    },
    {
      nome: "Camila Guedes",
      texto:
        "O atendimento foi humanizado e transparente. Me senti acolhida desde a primeira reunião, com total dedicação ao meu caso.",
    },
  ];

  return (
    <section
      id="depoimentos"
      className="relative w-full bg-brand-white text-blue py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Título */}
        <h2 className="text-center font-serif text-3xl font-bold mb-14 sm:text-4xl">
          Depoimentos
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {depoimentos.map((dep, i) => (
            <div
              key={i}
              className="rounded-2xl border border-blue/10 bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] p-8 transition-transform hover:-translate-y-1 hover:shadow-[0_15px_40px_-12px_rgba(0,0,0,0.25)]"
            >
              <p className="text-base leading-relaxed text-blue/90 italic mb-6">
                “{dep.texto}”
              </p>
              <span className="font-semibold text-sand">{dep.nome}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
