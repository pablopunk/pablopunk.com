import styled from "styled-components";
import withLayout from "components/skeleton/withLayout";
import { staticProps, staticPaths } from "components/data-fetch/withCMS";
import { smallMediaQuery } from "components/utils/media-queries";

const StyledGrid = styled.div`
  div {
    max-width: 600px;
    display: grid;
    grid-template-columns: 1fr 15fr;
    align-items: flex-start;
    grid-gap: var(--space-3);

    p {
      margin: 0;
    }
  }
`;

function howOldAmI() {
  const now = new Date();
  const iHadABirthDayThisYear = now.getMonth() >= 6 && now.getDate() >= 9;
  const yearsSinceIWasBorn = now.getFullYear() - 1993;

  return iHadABirthDayThisYear ? yearsSinceIWasBorn : yearsSinceIWasBorn - 1;
}

const StyledContent = styled.div`
  height: calc(100vh - var(--footer-height) - var(--nav-height));
  display: flex;
  align-items: center;
  justify-content: center;

  @media (${smallMediaQuery}) {
    height: 100%;
    margin-top: 50px;
  }
`;

interface IProps {
  content;
}

const Page = ({ content }: IProps) => {
  content = content.replace("%years%", howOldAmI());

  return (
    <StyledContent>
      <StyledGrid>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </StyledGrid>
    </StyledContent>
  );
};

export const getStaticProps = (ctx) => staticProps("about", ctx);
export const getStaticPaths = staticPaths;
export default withLayout(Page, "me");
