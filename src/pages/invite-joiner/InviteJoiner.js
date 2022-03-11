import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  fetchIJChannelList,
  fetchIJMonitorState,
  fetchInviteJoinerListState,
  fetchInviteJoinerLogState,
  fetchTempStorageState,
  setModalState,
  setTempStorage,
} from "../../features/counterSlice";
import {
  InviteJoinerKeywordSection,
  InviteJoinerLeftSection,
  InviteJoinerLogSection,
  InviteJoinerSettingSection,
  InviteJoinerTopSection,
} from "../../pages-component";

// function InviteJoiner() {
//   const dispatch = useDispatch();
//   const keywordList = useSelector(fetchIJChannelList);
// const claimerAccountList = useSelector(fetchInviteJoinerListState);
// const tempStorage = useSelector(fetchTempStorageState);
// const ijMonitorState = useSelector(fetchIJMonitorState);
// const logList = useSelector(fetchInviteJoinerLogState);
// useEffect(() => {
//   return () => {
//     dispatch(setTempStorage({}));
//   };
// }, [dispatch]);
// console.log(claimerAccountList);
// /**
//  * function handle modal state
//  **/
// const handleOpenModal = () => {
//   dispatch(setModalState("inviteJoinerAccount"));
// };

// return (
//   <div className="page-section">
//     <div className="left-container">
//       <InviteJoinerLeftSection
//         {...{ handleOpenModal, claimerAccountList, tempStorage }}
//       />
//     </div>
//     <div className="right-container invite-joiner">
//       <InviteJoinerTopSection />
//       <div className="page-padding-section">
//         <div className="linkopener-flex-wrapper">
//           <div className="linkopner-left-section invite-joiner">
//             <InviteJoinerSettingSection
//               {...{
//                 ijMonitorState,
//                 tempStorage,
//                 claimerAccountList,
//                   keywordList,
//                 }}
//               />
//               <div className="flex-keyword-channel invite-joiner">
//                 <InviteJoinerKeywordSection {...{ keywordList }} />
//                 <InviteJoinerLogSection
//                   logList={Object.keys(logList).map((key) => logList[key])}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

class InviteJoiner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMonitorStart: false,
    };
  }

  componentWillUnmount() {
    this.props.resetTempStorage();
  }

  render() {
    const {
      keywordList,
      claimerAccountList,
      tempStorage,
      ijMonitorState,
      logList,
      handleOpenModal,
    } = this.props;
    return (
      <div className="page-section">
        <div className="left-container">
          <InviteJoinerLeftSection
            {...{ handleOpenModal, claimerAccountList, tempStorage }}
          />
        </div>
        <div className="right-container invite-joiner">
          <InviteJoinerTopSection />
          <div className="page-padding-section">
            <div className="linkopener-flex-wrapper">
              <div className="linkopner-left-section invite-joiner">
                <InviteJoinerSettingSection
                  {...{
                    ijMonitorState,
                    tempStorage,
                    claimerAccountList,
                    keywordList,
                  }}
                />
                <div className="flex-keyword-channel invite-joiner">
                  <InviteJoinerKeywordSection {...{ keywordList }} />
                  <InviteJoinerLogSection
                    logList={Object.keys(logList).map((key) => logList[key])}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleOpenModal: () => dispatch(setModalState("inviteJoinerAccount")),
    resetTempStorage: () => dispatch(setTempStorage({})),
  };
};

const mapStateToProps = (state) => {
  return {
    keywordList: fetchIJChannelList(state),
    claimerAccountList: fetchInviteJoinerListState(state),
    tempStorage: fetchTempStorageState(state),
    ijMonitorState: fetchIJMonitorState(state),
    logList: fetchInviteJoinerLogState(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteJoiner);
