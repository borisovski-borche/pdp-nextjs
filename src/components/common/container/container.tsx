export type ContainerProps = {
  title: string;
  children: React.ReactNode;
  customClasses?: string;
};

export default function Container({
  title,
  children,
  customClasses,
}: ContainerProps) {
  return (
    <section
      className={`border-2 border-amber-600 mx-auto min-w-md max-w-6xl shadow-[5px_5px] rounded-xl shadow-amber-600  bg-amber-100 ${customClasses}`}
    >
      <h2 className="text-center text-3xl p-4 font-bold">{title}</h2>
      <div className="px-5">{children}</div>
    </section>
  );
}
