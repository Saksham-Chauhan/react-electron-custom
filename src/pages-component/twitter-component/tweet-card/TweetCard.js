import React from 'react'
import './styles.css'
import { AppSpacer } from '../../../component'
import bird from '../../../assests/images/bird.svg'
import { useSelector } from 'react-redux'
import { fetchThemsState } from '../../../features/counterSlice'

function TweetCard({
  cardTitle = 'New Tweet',
  tweetTime = 'Fri Feb 21 12:07:35 +0000 2022',
  tweetUser = 'KodersHQ',
  tweetMsgLink = 'https://t.co/uxttXwyy4F',
  tweetLink = '',
  tweetUserProfileLink = '',
  tweetUserFollowing = '',
}) {
  const appTheme = useSelector(fetchThemsState)
  return (
    <div
      className={
        appTheme ? 'tweet-card-outer light-mode-sidebar' : ' tweet-card-outer'
      }
    >
      <div className="tweet-card-top-section">
        <span id="cardtitle">{cardTitle}</span>
        <span id="tweetTime">{tweetTime}</span>
      </div>
      <AppSpacer spacer={20} />
      <div className="tweet-card-middle-section">
        <div className="twitter-logo">
          <img src={bird} alt="" />
          <span>{tweetUser}</span>
        </div>
        <span>{tweetMsgLink}</span>
      </div>
      <AppSpacer spacer={20} />
      <div className="tweet-card-bottom-section">
        <div onClick={() => window.open(tweetLink)}>Tweet</div>
        <div onClick={() => window.open(tweetUserProfileLink)}>
          View Profile
        </div>
        <div onClick={() => window.open(tweetUserFollowing)}>
          View Following
        </div>
      </div>
    </div>
  )
}

export default TweetCard
