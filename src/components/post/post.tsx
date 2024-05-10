import { convertDateToBr } from "@/functions/convertDateToBr";
import { Card, CardContent } from "../ui/card";

interface PostProps {
  title: string;
  body: string;
  contact: string;
  nome: string;
  date: Date;
}

export const PostComponent = ({
  title,
  body,
  contact,
  date,
  nome,
}: PostProps) => {
  return (
    <Card className="w-full">
      <CardContent>
        <div className="flex flex-col gap-y-4 text-left py-2">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <span>{nome}</span>
          <p className="text-sm text-justify">{body}</p>
          <div className="flex flex-col gap-y-4 md:gap-x-4 md:flex-row">
            <div>
              <p className="text-sm">Contato: {contact}</p>
            </div>
            <div>
              <p className="text-sm">
                Data: {convertDateToBr(date.toString())}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
