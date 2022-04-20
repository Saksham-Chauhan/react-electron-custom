import React from 'react'
import {
  TopWrapper,
  GroupTitle,
  GroupCard,
  AppSpacer,
} from '../../../component'
import solanaSol from '../../../assests/images/solanaSol.svg'
const LeftSection = () => {
  const handleOpenModal = () => {}
  return (
    <>
      <TopWrapper>
        <GroupTitle onClick={handleOpenModal} title="ETH Minter" />
      </TopWrapper>
      <AppSpacer spacer={20} />
      <div className="group-card-scroll">
        <GroupCard
          cardIcon={solanaSol}
          hideSubText={true}
          cardTitle="Group 1"
        />
      </div>
    </>
  )
}

export default LeftSection
