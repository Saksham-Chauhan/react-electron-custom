import React from 'react'
import './dashboard.css'
import {
  ChartLabel,
  DashboardButton,
  DashboardChart,
} from '../../pages-component'
import './dashboard.css'
import { TopWrapper, GroupStatusCard } from '../../component'

//IMPORT ROUTES
import { RoutePath } from '../../constant/index'

// IMPORT ICONS
import linkOpner from '../../assests/activeDefault/link-default.svg'
import twitter from '../../assests/activeDefault/twitter-default.svg'
import spoof from '../../assests/activeDefault/spoof-default.svg'
import proxy from '../../assests/activeDefault/proxy-default.svg'
import settings from '../../assests/activeDefault/settings-default.svg'
import accgen from '../../assests/activeDefault/accgen-default.svg'
import oneclick from '../../assests/activeDefault/nft-default.svg'
import invite from '../../assests/images/discord-dash.svg'
import { useSelector } from 'react-redux'
import {
  fetchProxyGroupList,
  fetchSpoofTableList,
  fetchLatestTweetList,
  fetchLinkOpenerLogState,
  fetchInviteJoinerLogState,
  fetchThemsState,
} from '../../features/counterSlice'

const DashboardPage = () => {
  const appTheme = useSelector(fetchThemsState)
  //GET PROXY LIST
  const proxyList = useSelector(fetchProxyGroupList)

  //GET STATE OF LINK OPNER
  let linkData = useSelector(fetchLinkOpenerLogState)
  const linkOpnerList = linkData ? Object.keys(linkData).length : 0

  //GET STATE OF INVITE JOINER
  let inviteData = useSelector(fetchInviteJoinerLogState)
  const inviteJoinerList = inviteData ? Object.keys(inviteData).length : 0

  //GET STATE OF TWITTER
  let tweetsData = useSelector(fetchLatestTweetList)
  let twitterList = tweetsData ? Object.keys(tweetsData).length : 0

  //GET STATE OF SPOOFER
  const spoofList = useSelector(fetchSpoofTableList)

  const getTotalProxy = () => {
    let totalProxy = 0
    for (let i = 0; i < proxyList.length; i++) {
      totalProxy += proxyList[i].proxyList.length
    }
    return totalProxy
  }
  //BUTTONS DATA
  const buttonsData = [
    {
      to: RoutePath.proxy,
      image: proxy,
      text: 'Proxies',
      value: getTotalProxy() ? getTotalProxy() : '0',
    },
    {
      to: RoutePath.linkOpener,
      image: linkOpner,
      text: 'Link Opener',
      value: linkOpnerList ? linkOpnerList : '0',
    },
    {
      to: RoutePath.inviteJoiner,
      image: invite,
      text: 'Invite Joiner',
      value: inviteJoinerList ? inviteJoinerList : '0',
    },
    {
      to: RoutePath.spoofer,
      image: spoof,
      text: 'Spoofer',
      value: spoofList.length ? spoofList.length : '0',
    },
    {
      to: RoutePath.twitter,
      image: twitter,
      text: 'Twitter Monitor',
      value: twitterList ? twitterList : '0',
    },
    {
      to: RoutePath.oneclick,
      image: oneclick,
      text: 'NFT Minter',
      value: 'Coming Soon',
    },
    {
      to: RoutePath.accountGen,
      image: accgen,
      text: 'Account Gen',
      value: 'Coming Soon',
    },
    {
      to: RoutePath.setting,
      image: settings,
      text: 'Settings',
      value: null,
    },
  ]

  return (
    <div
      className={appTheme ? 'dashboard light-mode-page-section' : 'dashboard'}
    >
      <TopWrapper>
        <GroupStatusCard title="Dashboard" isHide={true} />
      </TopWrapper>
      <div className="dashboard-buttons">
        {buttonsData.map((item, i) => {
          return <DashboardButton {...item} key={i} />
        })}
      </div>
      <div className="dashboard-chart">
        <DashboardChart />
        <ChartLabel />
      </div>
    </div>
  )
}
export default DashboardPage
