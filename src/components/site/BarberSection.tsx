import { SectionHeading } from "@/components/ui-kit/SectionHeading";
import { barbers } from "@/data/site";
import { BarberCard } from "./BarberCard";

export function BarberSection() {
  return (
    <section id="barbers" className="scroll-mt-20 border-t border-border py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="The Team"
          title="Meet your barbers"
          subtitle="Choose the barber who fits your style. Both work from the same standard — the difference is in the hands."
        />

        <div className="mt-14 grid gap-14 sm:mt-20 lg:grid-cols-2 lg:gap-10">
          {barbers.map((barber, i) => (
            <BarberCard key={barber.id} barber={barber} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
