import Card from "components/containers/Card";
import { staticPaths, staticProps } from "components/data-fetch/withCMS";
import CenterFlexColumns from "components/containers/CenterFlexColumns";
import withLayout from "components/skeleton/withLayout";
import SimpleList from "components/containers/SimpleList";
import { smallMediaQuery } from "components/utils/media-queries";
import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Grid4 from "components/containers/Grid4";
import ReactLogo from "components/pure/svg/react";
import NextLogo from "components/pure/svg/nextjs";
import GraphQLLogo from "components/pure/svg/graphql";
import NodeLogo from "components/pure/svg/node";
import Repos from "components/data-fetch/Repos";

const ExampleProject = styled.div`
  display: flex;
  align-items: center;

  padding: 1rem 2rem;
  border-radius: 5px;
  box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-bgDim);

  background-color: var(--color-bg);
  border: 1px solid var(--color-bgDim);

  transition: border var(--transition-time), background var(--transition-time);

  figure {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    strong {
      color: var(--color-accent2);
    }

    img {
      border-radius: 4px;
      width: 150px;
      @media (${smallMediaQuery}) {
        width: 100%;
      }
    }
  }

  @media (${smallMediaQuery}) {
    flex-direction: column;
  }
`;

const FlexRows = styled.div`
  display: flex;
  flex-direction: row;
  * {
    margin: 0.8rem 0.4rem;
  }
  p {
    font-size: 2.1rem;
    text-align: justify;
  }
  @media (${smallMediaQuery}) {
    flex-direction: column;
    p {
      text-align: left;
    }
  }
`;

function go(link: string) {
  window.open(`https://${link}`);
}

interface IProps {
  introHeader: string;
  abstract: string;
  exampleProjectsHeader: string;
  githubReposIntroduction: string;
  allExampleProjects: Array<any>;
  locale: string;
}

const Page = ({
  introHeader,
  abstract,
  exampleProjectsHeader,
  githubReposIntroduction,
  allExampleProjects,
  locale
}: IProps) => {
  return (
    <CenterFlexColumns>
      <section>
        <h2 style={{ textAlign: "center" }}>{introHeader}</h2>
        <Grid4>
          <div className="negative">
            <Card onClick={(_) => go("reactjs.org")}>
              <ReactLogo />
              <strong>ReactJS</strong>
            </Card>
          </div>
          <Card onClick={(_) => go("nextjs.org")}>
            <NextLogo />
            <strong>NextJS</strong>
          </Card>
          <div className="negative">
            <Card onClick={(_) => go("nodejs.org")}>
              <NodeLogo />
              <strong>NodeJS</strong>
            </Card>
          </div>
          <Card onClick={(_) => go("graphql.org")}>
            <GraphQLLogo />
            <strong>GraphQL</strong>
          </Card>
        </Grid4>
        <SimpleList>
          <ul>
            <div dangerouslySetInnerHTML={{ __html: abstract }}></div>
          </ul>
        </SimpleList>
      </section>
      <section>
        <h3 style={{ textAlign: "center" }}>{exampleProjectsHeader}</h3>
        {allExampleProjects.map((project) => (
          <div key={project.name}>
            <FlexRows>
              <ExampleProject>
                <figure onClick={(_) => window.open(project.link)}>
                  <LazyLoadImage
                    src={project.picture.url}
                    alt={project.picture.alt}
                    placeholder={
                      <img
                        src={project.picture.blurUpThumb}
                        alt={project.picture.alt}
                      />
                    }
                  />
                  <strong>{project.name}</strong>
                </figure>
                <CenterFlexColumns>
                  <div
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                </CenterFlexColumns>
              </ExampleProject>
            </FlexRows>
          </div>
        ))}
      </section>
      <section>
        <CenterFlexColumns>
          <div
            style={{ textAlign: "center" }}
            dangerouslySetInnerHTML={{ __html: githubReposIntroduction }}
          ></div>
          <Repos locale={locale} />
        </CenterFlexColumns>
      </section>
    </CenterFlexColumns>
  );
};

export const getStaticProps = (ctx) => staticProps("portfolio", ctx);
export const getStaticPaths = staticPaths;
export default withLayout(Page, "portfolio");
