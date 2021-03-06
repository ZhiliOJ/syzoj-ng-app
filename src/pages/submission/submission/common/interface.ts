import { CodeLanguage } from "@/interfaces/CodeLanguage";
import { useLocalizer } from "@/utils/hooks";
import { OmittableString } from "@/components/CodeBox";

import { SubmissionProgress, SubmissionProgressMeta } from "../SubmissionPage";

type IntlMessageFormatter = ReturnType<typeof useLocalizer>;

export interface TestcaseResultCommon {
  testcaseInfo?: {
    timeLimit?: number;
    memoryLimit?: number;
    inputFile?: string;
    outputFile?: string;
  };
  status: string;
  score: number;
  time?: number;
  memory?: number;
  input?: OmittableString;
  output?: OmittableString;
  userOutput?: OmittableString;
  userError?: OmittableString;
  systemMessage?: OmittableString;
}

export type GetAdditionalSectionsCallback<TestcaseResult extends TestcaseResultCommon = TestcaseResultCommon> = (
  testcaseResult: TestcaseResult
) => React.ReactNode;

export interface ProblemTypeSubmissionViewProps<TestcaseResult extends TestcaseResultCommon, SubmissionContent> {
  content: SubmissionContent;
  progress: SubmissionProgress<TestcaseResult>;
  progressMeta: SubmissionProgressMeta;
  getCompilationMessage: () => React.ReactElement;
  getSystemMessage: () => React.ReactElement;
  getSubtasksView: (getAdditionalSections: GetAdditionalSectionsCallback<TestcaseResult>) => React.ReactElement;
  refDefaultCopyCodeBox: React.Ref<HTMLPreElement>;
}

export interface ProblemTypeSubmissionViewHelper<SubmissionContent> {
  config?: {
    hideTimeMemory?: boolean;
  };
  getDownloadAnswerFilename?: (meta: ApiTypes.SubmissionMetaDto) => string;
  getAnswerInfo?: (content: SubmissionContent, _: IntlMessageFormatter) => React.ReactNode;
  getHighlightLanguageList?: (content: SubmissionContent) => CodeLanguage[];
}

export type ProblemTypeSubmissionView = React.FC<ProblemTypeSubmissionViewProps<TestcaseResultCommon, unknown>> &
  ProblemTypeSubmissionViewHelper<unknown>;
