// import React, { createContext, useEffect, useReducer, useState } from "react";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import { io, Manager } from "socket.io-client";
import {
  Box,
  CardHeader,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useRef, useEffect, useState } from "react";

import Register from "./components/parts/inputs/forms/formAccount/formRegisterForm.js";
import RestorePass from "./components/parts/inputs/forms/formAccount/formForgetPassword.js";
import Login from "./components/parts/inputs/forms/formAccount/formLogin.js";
import CheckCodeEmail from "./components/parts/inputs/forms/formAccount/formCheckCodeEmail";

import PagePersonal from "./components/parts/pages/pagePersonal/PagePersonal";
import SubContentPersonal from "./components/parts/subContents/subContentPersonal/SubContentPersonal";

import Content from "./components/layouts/content/Content";
import Header from "./components/layouts/header/Header.js";
import SidebarLeft from "./components/layouts/sidebars/sidebarLeft/Sidebar";
import Widgets from "./components/layouts/sidebars/sidebarRight/SidebarRight.jsx";
import Feed from "./components/parts/feed/Feed";

import {
  add_friend_online,
  delete_friend_online,
  set_data_account,
  set_io,
  set_url,
} from "./store/actions.js";
import { HOST_SERVER } from "./config.js";
import { useStore } from "./store/hooks.js";
import { get_slug } from "./store/functions.js";
import PageFriend, {
  SidebarFriendList,
  SidebarFriendMenuDefault,
  SidebarFriendRequest,
  SidebarFriendResponse,
} from "./components/parts/pages/pageFriend/PageFriend.js";
import { LIST_TAB_HEADER_PERSONAL_DEFAULT } from "./store/constants.js";
function App({ result }) {
  var [state, dispatch] = useStore();

  const [state_slugs, set_state_slugs] = useState([]);
  const [mode, setMode] = useState("light");

  result = JSON.parse(result);
  const isLoginEd = result.status;
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  // console.log(state_slugs[0],'friends');
  useEffect(() => {
    if (isLoginEd === 200) {
      state.socket.on(`ACCOUNT_${result.account.slug_personal}_UPDATE`,dataAccount_own=>{
        dispatch(set_data_account(dataAccount_own));
      })
      window.addEventListener("popstate", () => {
        dispatch(set_url(new Date().toISOString()));
      });
      if (JSON.parse(sessionStorage.getItem("noReload")) == 2) {
        sessionStorage.setItem("oldURL", window.location.href);
      }
      sessionStorage.setItem(
        "noReload",
        JSON.parse(sessionStorage.getItem("noReload")) - 1
      );

      if (JSON.parse(sessionStorage.getItem("noReload")) > 0) {
        window.location.reload();
      } else if (JSON.parse(sessionStorage.getItem("noReload")) == 0) {
        var slugs = get_slug(window.location.href);

        if (!slugs) slugs = [];
        if (slugs.length >= 2 && slugs[0] === "account") {
          console.log(slugs);
          set_state_slugs(slugs);
        }
      } else if (JSON.parse(sessionStorage.getItem("noReload")) < 0) {
        sessionStorage.setItem("noReload", 2);
        window.location.reload();
      }
      dispatch(set_data_account(result.account));
    } else {
      if (JSON.parse(sessionStorage.getItem("noReload")) > 2) {
        window.location.reload();
        sessionStorage.setItem(
          "noReload",
          JSON.parse(sessionStorage.getItem("noReload")) - 1
        );
      }
    }
  }, []);
  useEffect(() => {
    if (state.account.list_slug_friend) {
      state.account.list_slug_friend.forEach((slug_friend) => {
        state.socket.emit(`I_AM_ONLINE`, result.account);
        state.socket.once(`FRIEND_${slug_friend}_ONLINE`, (my_friend) => {
          dispatch(add_friend_online(my_friend));
        });
        state.socket.once(`FRIEND_${slug_friend}_OFFLINE`, (my_friend) => {
          dispatch(delete_friend_online(my_friend));
          state.socket.off(`FRIEND_${slug_friend}_ONLINE`);
        });
      });
      state.socket.on(
        `LIST_FRIEND_ONLINE_OF_${state.account.slug_personal}`,
        (list_friend_online) => {
          list_friend_online.forEach((my_friend) => {
            dispatch(add_friend_online(my_friend));
          });
          state.socket.off(
            `LIST_FRIEND_ONLINE_OF_${state.account.slug_personal}`
          );
        }
      );
    }
  }, [state.account.list_slug_friend]);

  useEffect(() => {
    if (state.account) {
      state.socket.on(
        `${state.account.slug_personal}_UPDATE_LIST_SLUG_FRIEND`,
        (dataAccount) => {
          dispatch(set_data_account(dataAccount));
          // state.socket.off(`${state.account.slug_personal}_UPDATE_LIST_SLUG_FRIEND`);
        }
      );
    }
  }, [state.account]);
  useEffect(() => {
    if (isLoginEd === 200) {
      result.account.list_slug_friend.forEach((slug_friend) => {
        state.socket.emit(`I_AM_ONLINE`, result.account);
        state.socket.once(`FRIEND_${slug_friend}_ONLINE`, (my_friend) => {
          dispatch(add_friend_online(my_friend));
        });
        state.socket.on(`FRIEND_${slug_friend}_OFFLINE`, (my_friend) => {
          dispatch(delete_friend_online(my_friend));
          state.socket.off(`FRIEND_${slug_friend}_ONLINE`);
        });
      });
      state.socket.on(
        `LIST_FRIEND_ONLINE_OF_${result.account.slug_personal}`,
        (list_friend_online) => {
          list_friend_online.forEach((my_friend) => {
            dispatch(add_friend_online(my_friend));
          });
          state.socket.off(
            `LIST_FRIEND_ONLINE_OF_${result.account.slug_personal}`
          );
        }
      );
    }
  }, [state.friendsOnline]);
  useEffect(() => {
    var slugs = get_slug(window.location.href);

    if (!slugs) slugs = [];
    console.log("stateURL", slugs);
    if (slugs.length >= 2 && slugs[0] === "account") {
      console.log(
        `/${slugs
          .map((slug) => {
            return slug;
          })
          .join("/")}`
      );
      set_state_slugs(slugs);
    } else if (slugs.length >= 1 && slugs[0] === "friends") {
      set_state_slugs(slugs);
    }
  }, [state.url]);

  return (
    <div id="app">
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter key={"All"}>
          <Box
            bgcolor={"background.default"}
            sx={{ width: 1 }}
            color={"text.primary"}
          >
            {!(isLoginEd === 200) ? (
              <>
                <Routes>
                  <Route path="/*" element={<Login />}></Route>
                  <Route path="/restorePass" element={<RestorePass />}></Route>
                  <Route
                    path="/CheckCodeEmail"
                    element={<CheckCodeEmail />}
                  ></Route>
                  <Route path="/signup" element={<Register />}></Route>
                </Routes>
              </>
            ) : (
              <>
                {/* <PopUpContentContext key={1}> */}
                <Box
                  bgcolor={"background.default"}
                  color={"text.primary"}
                  style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    right: "0",
                    height: "60px",
                    zIndex: "1",
                  }}
                >
                  <Header
                    avatar_account={result.account.avatar_account}
                    slug_personal={result.account.slug_personal}
                    account={result.account}
                  />
                </Box>

                <div className="linkHidden">
                  {/* <Link id="Personal" to={"/"+result.account.slug_personal+"/*"}></Link>
                <Link id="Post" to="/0oLMDo0/0/"></Link> */}
                </div>
                <Content
                  bodyContent={
                    <>
                      <SidebarLeft isShowTittle={state_slugs[0]!='friends'} mode={mode} setMode={setMode} />
                      <Widgets friendsOnline={state.friendsOnline} />

                      <Routes>
                        <Route path="/*" element={<Feed />}></Route>
                        {state_slugs[0] === "account" && (
                          <Route
                            path={`/${state_slugs[0]}/${state_slugs[1]}/*`}
                            element={
                              <PagePersonal
                                slugs={state_slugs}
                                elContent={<SubContentPersonal data="Header" />}
                              />
                            }
                          >
                            {LIST_TAB_HEADER_PERSONAL_DEFAULT.map((el, idx) => {
                              return (
                                <Route
                                  key={idx}
                                  path={`${el}`}
                                  element={
                                    <SubContentPersonal key={idx} data={el} />
                                  }
                                ></Route>
                              );
                            })}
                          </Route>
                        )}
                        {state_slugs[0] === "friends" && (
                          <Route
                            path={`${state_slugs[0]}`}
                            element={<PageFriend />}
                          >
                            {[
                              ,
                              {
                                url: "request",
                                element: <SidebarFriendRequest />,
                              },
                              { url: "list", element: <SidebarFriendList /> },
                              {
                                url: "response",
                                element: <SidebarFriendResponse />,
                              },
                              {
                                url: "",
                                element: <SidebarFriendMenuDefault />,
                              },
                            ].map((el, idx) => {
                              if(el.url=='request')
                              {
                                return (
                                  <Route
                                    key={idx}
                                    path={el.url}
                                    element={el.element}
                                  >
                                    {state_slugs.length > 2 && (
                                      result.account.list_request_new_friend.map((friend,idx)=>{
                                        return(<Route
                                        key={idx}
                                        path={friend.slug_friend}
                                        element={
                                          <PagePersonal key={idx} slugs={state_slugs} />
                                        }
                                      >
                                        {state_slugs.length>3&&LIST_TAB_HEADER_PERSONAL_DEFAULT.map(
                                          (el, idx) => {
                                            return (
                                              <Route
                                                key={idx}
                                                path={`${el}`}
                                                element={
                                                  <SubContentPersonal
                                                    key={idx}
                                                    data={el}
                                                  />
                                                }
                                              ></Route>
                                            );
                                          }
                                        )}
                                      </Route>)
                                      })
                                    )}
                                  </Route>
                                );
                              }
                              else if(el.url ==='response')
                              {
                                return (
                                  <Route
                                    key={idx}
                                    path={el.url}
                                    element={el.element}
                                  >
                                    {state_slugs.length > 2 && (
                                      result.account.list_response_new_friend.map((friend,idx)=>{
                                        return(<Route
                                        key={idx}
                                        path={friend.slug_friend}
                                        element={
                                          <PagePersonal key={idx} slugs={state_slugs} />
                                        }
                                      >
                                        {state_slugs.length>3&&LIST_TAB_HEADER_PERSONAL_DEFAULT.map(
                                          (el, idx) => {
                                            return (
                                              <Route
                                                key={idx}
                                                path={`${el}`}
                                                element={
                                                  <SubContentPersonal
                                                    key={idx}
                                                    data={el}
                                                  />
                                                }
                                              ></Route>
                                            );
                                          }
                                        )}
                                      </Route>)
                                      })
                                    )}
                                  </Route>
                                );
                              }
                              else 
                              {return (
                                <Route
                                  key={idx}
                                  path={`${el.url}`}
                                  element={el.element}
                                >
                                  {state_slugs.length > 2 && (
                                    result.account.list_slug_friend.map((slug_friend,idx)=>{
                                      return(<Route
                                      key={idx}
                                      path={slug_friend}
                                      element={
                                        <PagePersonal key={idx} slugs={state_slugs} />
                                      }
                                    >
                                      {state_slugs.length>3&&LIST_TAB_HEADER_PERSONAL_DEFAULT.map(
                                        (el, idx) => {
                                          return (
                                            <Route
                                              key={idx}
                                              path={`${el}`}
                                              element={
                                                <SubContentPersonal
                                                  key={idx}
                                                  data={el}
                                                />
                                              }
                                            ></Route>
                                          );
                                        }
                                      )}
                                    </Route>)
                                    })
                                  )}
                                </Route>
                              );}
                            })}
                          </Route>
                        )}
                      </Routes>
                    </>
                  }
                ></Content>
                {/* </PopUpContentContext> */}
              </>
            )}
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
