type Props = { data: object | object[] };

export default function JsonLd({ data }: Props) {
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      // schema.org payload — no user input goes here.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
