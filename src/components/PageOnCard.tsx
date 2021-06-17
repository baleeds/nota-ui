import React, { ReactNode } from 'react';
import { Tab, TabProps, Tabs } from './Tabs';
import { Page } from './Page';
import { useScreen } from '../hooks/useScreen';
import { MobileHeader, MobileHeaderNavLink } from './MobileHeader';
import { Flex } from './layout/Flex';
import { ReactComponent as ChevronLeftIcon } from '../icons/chevron_left-24px.svg';
import { Card } from './Card';
import { Box } from './layout/Box';
import { Separator } from './Separator';
import styled from 'styled-components';
import { LinkBaseButton } from './Buttons';
import { SpaceConfig } from './layout/types';
import { theme } from '../styles/theme';

export interface PageOnCardHeaderAction {
  icon: () => ReactNode;
  to: string;
}

interface Props {
  backTo?: string;
  showBackTo?: 'mobile' | 'desktop';
  title?: string;
  headerActions?: PageOnCardHeaderAction[];
  tabs?: TabProps[];
  bodyPadding?: {
    mobile?: SpaceConfig;
    desktop?: SpaceConfig;
  };
}

export const PageOnCard: React.FC<Props> = ({
  backTo,
  showBackTo,
  title,
  headerActions = [],
  tabs,
  bodyPadding,
  children,
}) => {
  const { isMobile } = useScreen();

  if (isMobile) {
    const mobileHeaderHeight = 60;

    const mobilePadding: SpaceConfig = bodyPadding?.mobile ?? {};
    const paddingTop =
      mobilePadding.t ?? mobilePadding.tb ?? mobilePadding.all ?? 0;

    mobilePadding.t =
      paddingTop + (tabs ? theme.tabHeight : 0) + mobileHeaderHeight;

    const showBackButton = showBackTo === undefined || showBackTo === 'mobile';

    return (
      <Page>
        <MobileHeader>
          <div>
            <Flex spaceBetween={true} alignItems="center">
              <Flex alignItems="center">
                {backTo && showBackButton && (
                  <MobileHeaderNavLink to={backTo}>
                    <ChevronLeftIcon />
                  </MobileHeaderNavLink>
                )}
                {title && <span>{title}</span>}
              </Flex>
              <Flex alignItems="center">
                {headerActions.map((action) => (
                  <LinkBaseButton to={action.to}>
                    {action.icon()}
                  </LinkBaseButton>
                ))}
              </Flex>
            </Flex>
            {tabs && (
              <Tabs>
                {tabs.map((tab) => (
                  <Tab to={tab.to} title={tab.title} />
                ))}
              </Tabs>
            )}
          </div>
        </MobileHeader>
        <Box padding={mobilePadding}>{children}</Box>
      </Page>
    );
  } else {
    const showBackButton = showBackTo === undefined || showBackTo === 'desktop';

    return (
      <Page>
        <Container>
          <Card>
            <Header>
              <Flex spaceBetween={true} alignItems="center">
                <Flex alignItems="center">
                  {backTo && showBackButton && (
                    <MobileHeaderNavLink to={backTo}>
                      <ChevronLeftIcon />
                    </MobileHeaderNavLink>
                  )}
                  {title && <span className="title">{title}</span>}
                </Flex>
                <Flex alignItems="center">
                  {headerActions.map((action) => (
                    <LinkBaseButton to={action.to}>
                      {action.icon()}
                    </LinkBaseButton>
                  ))}
                </Flex>
              </Flex>
            </Header>
            {tabs ? (
              <Tabs>
                {tabs.map((tab) => (
                  <Tab to={tab.to} title={tab.title} />
                ))}
              </Tabs>
            ) : (
              <Separator />
            )}
            <Box padding={bodyPadding?.desktop}>{children}</Box>
          </Card>
        </Container>
      </Page>
    );
  }
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 750px;
`;

const Header = styled.div`
  display: flex;
  flex: 1;
  height: 40px;
  align-items: center;
  margin-bottom: 8px;

  .title {
    font-size: 1.25rem;
    font-weight: bold;
    color: ${theme.primaryTextColor};
  }

  .actions {
    color: ${theme.primaryColor};

    a {
      display: block;
      height: 20px;
      width: 20px;

      svg {
        height: 20px;
        width: 20px;
      }
    }
  }
`;
