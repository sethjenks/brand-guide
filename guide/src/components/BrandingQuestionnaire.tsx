import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Clothesline } from "@/components/Clothesline";
import { CopySnippet } from "@/components/CopySnippet";
import {
  BRANDING_QUESTIONNAIRE_FACILITATOR_NOTES,
  BRANDING_QUESTIONNAIRE_INTRO,
  BRANDING_QUESTIONNAIRE_SECTIONS,
  type QuestionnaireQuestion,
} from "@/lib/branding-questionnaire";
import { sectionLeafStyle } from "@/lib/section-leaf";

type BrandingQuestionnaireProps = {
  /** Agentic prompt to copy (from setup sources). */
  prompt: string;
};

function ResponsePlaceholder({
  lines,
}: {
  lines?: number;
}) {
  const count = lines && lines > 1 ? lines : 1;

  return (
    <VStack gap={1} className="questionnaire-response" aria-hidden="true">
      <Text type="supporting" color="secondary" display="block">
        Answer space (print / PDF)
      </Text>
      {Array.from({ length: count }, (_, i) => (
        <VStack
          key={i}
          gap={0}
          width="100%"
          className="questionnaire-response-line"
          aria-hidden="true"
        />
      ))}
    </VStack>
  );
}

function QuestionBlock({ question }: { question: QuestionnaireQuestion }) {
  return (
    <VStack gap={2} className="questionnaire-question">
      <Text
        weight="semibold"
        color="primary"
        as="p"
        display="block"
        className="measure"
      >
        {question.prompt}
      </Text>
      {question.hint ? (
        <Text
          type="supporting"
          color="secondary"
          as="p"
          display="block"
          className="measure"
        >
          {question.hint}
        </Text>
      ) : null}
      <ResponsePlaceholder lines={question.responseLines} />
    </VStack>
  );
}

/**
 * Utilities → Branding Questionnaire: single page of stacked clotheslines.
 */
export function BrandingQuestionnaire({ prompt }: BrandingQuestionnaireProps) {
  const intro = BRANDING_QUESTIONNAIRE_INTRO;

  return (
    <VStack
      as="section"
      id="utilities-branding-questionnaire"
      gap={0}
      width="100%"
      className="branding-questionnaire"
      aria-labelledby="utilities-branding-questionnaire-title"
    >
      <Clothesline
        as="section"
        style={sectionLeafStyle}
        title={
          <Heading
            level={3}
            id="utilities-branding-questionnaire-title"
            className="clothesline-title"
          >
            {intro.title}
          </Heading>
        }
      >
        <VStack gap={4} width="100%" align="start">
          <Text
            type="large"
            weight="semibold"
            color="primary"
            as="p"
            display="block"
            className="measure"
          >
            {intro.summary}
          </Text>
          <VStack gap={2} className="measure questionnaire-protocol">
            {intro.protocol.map((line) => (
              <Text
                key={line}
                as="p"
                color="secondary"
                display="block"
              >
                · {line}
              </Text>
            ))}
          </VStack>
          <Text type="supporting" color="secondary" as="p" display="block">
            Output: <code>{intro.outputPath}</code>
          </Text>
        </VStack>
      </Clothesline>

      {prompt ? (
        <CopySnippet
          id="utilities-questionnaire-prompt"
          title="Agent prompt"
          text={prompt}
        />
      ) : null}

      {BRANDING_QUESTIONNAIRE_SECTIONS.map((section) => (
        <Clothesline
          key={section.id}
          as="section"
          id={`utilities-questionnaire-${section.id}`}
          style={sectionLeafStyle}
          title={
            <Heading
              level={3}
              id={`utilities-questionnaire-${section.id}-title`}
              className="clothesline-title"
            >
              {section.title}
            </Heading>
          }
        >
          <VStack gap={8} width="100%" align="start">
            {section.questions.map((q) => (
              <QuestionBlock key={q.prompt} question={q} />
            ))}
          </VStack>
        </Clothesline>
      ))}

      <Clothesline
        as="section"
        id="utilities-questionnaire-facilitator"
        style={sectionLeafStyle}
        title={
          <Heading
            level={3}
            id="utilities-questionnaire-facilitator-title"
            className="clothesline-title"
          >
            Facilitator Notes
          </Heading>
        }
      >
        <VStack gap={3} className="measure">
          {BRANDING_QUESTIONNAIRE_FACILITATOR_NOTES.map((note) => (
            <Text key={note} as="p" color="primary" display="block">
              · {note}
            </Text>
          ))}
        </VStack>
      </Clothesline>
    </VStack>
  );
}
