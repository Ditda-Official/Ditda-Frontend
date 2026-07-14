export { getCurrentRevisionDetail, postRevision, uploadRevisionFile } from "./api/revision";
export type {
  CurrentRevisionDetail,
  RevisionCategoryCode,
  RevisionItem,
  SubmitRevisionBody,
  SubmitRevisionResult,
  TargetDraft,
} from "./api/revisionTypes";
export { REVISION_FILE_TARGET } from "./config/revision";
