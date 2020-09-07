import useSWR from "swr";
import fetch from "isomorphic-unfetch";
import humanNumber from "human-number";
import Loading from "components/Loading";
import { t } from "lib/locales";
import styled from "styled-components";
import { smallMediaQuery } from "components/utils/media-queries";

const API = "https://repos.pablo.pink/api";

const ADDITIONAL_REPOS = [
  {
    name: "lad",
    html_url: "https://github.com/ladjs/lad",
    stargazers_count: "1700",
    description: "Lad scaffolds a Koa webapp and API framework for Node.js"
  },
  {
    name: "forwardemail.net",
    html_url: "https://github.com/forwardemail/free-email-forwarding",
    stargazers_count: "1500",
    description: "The best free email forwarding for custom domains"
  }
];

const fetcher = (url) => fetch(url).then((_) => _.json());

const StyledGrid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  @media (${smallMediaQuery}) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
  margin-top: 2rem;
  margin-bottom: 4rem;
  div {
    padding: var(--space-2) 0 0 var(--space-2);
    border-radius: var(--space-1);
    border: 1px solid var(--color-bgDim);
  }
`;

export default function Repos({ locale }) {
  const { data, error } = useSWR(API, fetcher);

  if (error) {
    return <strong style={{ color: "orangered" }}>Error fetching repos</strong>;
  }

  if (!data) {
    return <Loading />;
  }

  const repos = [...ADDITIONAL_REPOS, ...data]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 13)
    .map((repo) => ({
      ...repo,
      description: repo.description?.replace("[UNMANTAINED]. ", "") || ""
    }))
    .map((repo) => ({
      ...repo,
      description: t(repo.description ?? "", locale)
    }))
    .map((repo) => ({
      ...repo,
      stargazers_count_nice: humanNumber(repo.stargazers_count)
    }));

  return (
    <StyledGrid2>
      {repos.map((repo) => (
        <div key={repo.name}>
          <span className="first-line">
            <a href={repo.html_url}>/{repo.name}</a>
            <span>{repo.stargazers_count_nice}</span>
            <span role="img" aria-label="star">
              ⭐️
            </span>
          </span>
          <p>{repo.description}</p>
        </div>
      ))}
      <style jsx>{`
        .first-line {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .first-line > * {
          margin-right: 1rem;
        }
      `}</style>
    </StyledGrid2>
  );
}
