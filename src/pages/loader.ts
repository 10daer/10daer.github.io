import { works } from "../data-station";

export default function Loader(params: string) {
  const Id = params.split("/")[2] as string;
  const worksCount = works.length;
  const project = works.find((project) => Id === project.projectId);
  const projectIndex = Number(Id.split("-")[1]);

  const setUrl = (index: number) =>
    `/works/10daer-${index.toString().padStart(2, "0")}`;

  const prev = projectIndex === 0 ? "" : setUrl(projectIndex - 1);
  const next = projectIndex === worksCount - 1 ? "" : setUrl(projectIndex + 1);

  return { ...project, prev, next };
}
