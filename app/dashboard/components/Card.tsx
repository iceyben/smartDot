interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export default function Card({ title, value, icon }: CardProps) {
  return (
    <>
      <div className="bg-slate-100 flex flex-col justify-center  p-4 m-5 rounded-lg shadow-md">
        <span className="flex items-center space-x-30 mb-4 justify-between">
          <h3 className="text-green-700">{title}</h3>
          <div className="bg-white p-3 rounded-full text-green-700 ">
            {icon}
          </div>
        </span>
        <h2 className="text-2xl text-green-700 font-medium">${value}</h2>
      </div>
    </>
  );
}
