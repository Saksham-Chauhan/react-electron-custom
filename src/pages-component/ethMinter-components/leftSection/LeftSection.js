import React from 'react'
import {
  TopWrapper,
  GroupTitle,
  GroupCard,
  AppSpacer,
} from '../../../component'
const LeftSection = () => {
  const handleOpenModal = () => {}
  return (
    <>
      <TopWrapper>
        <GroupTitle onClick={handleOpenModal} title="ETH Minter" />
      </TopWrapper>
      <AppSpacer spacer={20} />
      <div className="group-card-scroll">
        <GroupCard cardIcon="mask" hideSubText={true} cardTitle="gjdgsad" />
      </div>
    </>
  )
}

export default LeftSection
