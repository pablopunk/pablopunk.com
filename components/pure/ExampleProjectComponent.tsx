import { FunctionComponent } from 'react'
import { ExampleProject } from 'types/datocms'
import Image from 'next/image'
import { go } from 'utils/helpers'

type Props = {
  project: ExampleProject
}

const ExampleProjectComponent: FunctionComponent<Props> = ({ project }) => (
  <div
    className="min-h-[450px] bg-bg2 rounded-xl m-3 shadow-lg hover:bg-bg cursor-pointer transition-all group hover:shadow-none flex flex-col justify-between"
    onClick={() => go(project.link)}
  >
    <div className="w-full flex justify-center group-hover:opacity-80 transition-opacity h-[255px]">
      <Image
        src={project.picture.url}
        width={project.picture.width}
        height={project.picture.height}
        className="rounded-t-xl object-cover filter group-hover:grayscale"
      />
    </div>
    <div
      dangerouslySetInnerHTML={{ __html: project.description }}
      className="p-4"
    ></div>
    <h4 className="text-center text-3xl bg-accent2 text-bg p-2 rounded-b-xl group-hover:bg-bg group-hover:text-accent2 transition-colors">
      {project.name}
    </h4>
  </div>
)

export default ExampleProjectComponent
