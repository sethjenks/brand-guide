import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Clothesline } from "@/components/Clothesline";

type SectionStubProps = {
  id: string;
  title: string;
};

/** Placeholder leaf when brand.md has no compiled content yet. */
export function SectionStub({ id, title }: SectionStubProps) {
  return (
    <Clothesline
      as="section"
      id={id}
      className="block subsection"
      aria-labelledby={`${id}-title`}
      title={
        <Heading level={3} id={`${id}-title`} className="clothesline-title">
          {title}
        </Heading>
      }
    >
      <Text
        color="secondary"
        as="p"
        display="block"
        className="measure"
      >
        Coming from <code>brand.md</code>.
      </Text>
    </Clothesline>
  );
}
