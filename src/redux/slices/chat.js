import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

const initialState = {
  conversations: [],
  users: [],
  currentConversation: null,
  typing: {},
};

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    startConversationSuccess(state, action) {
      const prevConversation = state.conversations.find(
        (el) => el._id === action.payload._id
      );

      if (prevConversation) {
        state.conversations = state.conversations.map((el) => {
          if (el._id === action.payload._id) {
            return action.payload;
          }
          return el;
        });
      } else {
        state.conversations.unshift(action.payload);
      }
    },
    fetchUsersSuccess(state, action) {
      state.users = action.payload;
    },
    fetchConversationsSuccess(state, action) {
      state.conversations = action.payload;
    },
    setCurrentConversation(state, action) {
      state.currentConversation = action.payload;
    },
    updateUserStatus(state, action) {
      state.conversations = state.conversations.map((conversation) => {
        return {
          ...conversation,
          participants: conversation.participants.map((el) => {
            if (el._id === action.payload.userId) {
              return {
                ...el,
                status: action.payload.status,
              };
            } else {
              return el;
            }
          }),
        };
      });
    },
    replaceChatHistory(state, action) {
      state.conversations = state.conversations.map((conversation) => {
        if (
          action.payload.conversationId?.toString() ===
          conversation._id?.toString()
        ) {
          return {
            ...conversation,
            messages: action.payload.history,
          };
        } else {
          return conversation;
        }
      });
    },
    addMessageSuccess(state, action) {
      state.conversations = state.conversations.map((conversation) => {
        if (conversation._id === action.payload.conversationId) {
          conversation.messages.push(action.payload.message);
        }
        return conversation;
      });
    },
    updateTyping(state, action) {
      state.typing = action.payload;
    },
  },
});

// Async actions
export const createGroupConversation = createAsyncThunk(
  "chat/createGroupConversation",
  async (participants, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/user/start-group-conversation", // Adjust the endpoint as necessary
        { participants },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );
      return response.data.data.conversation; // Adjust based on your API response
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const {
  setError,
  setLoading,
  startConversationSuccess,
  fetchUsersSuccess,
  fetchConversationsSuccess,
  setCurrentConversation,
  updateUserStatus,
  replaceChatHistory,
  addMessageSuccess,
  updateTyping,
} = slice.actions;

// Extra reducers
slice.extraReducers = (builder) => {
  builder
    .addCase(createGroupConversation.fulfilled, (state, action) => {
      state.conversations.unshift(action.payload); // Add the new group conversation to the list
    })
    .addCase(createGroupConversation.rejected, (state, action) => {
      toast.error(
        action.payload.message || "Failed to create group conversation"
      );
    });
};

// UPDATE TYPING
export function UpdateTypingStatus(data) {
  return async (dispatch) => {
    dispatch(updateTyping(data));
  };
}

// ADD MESSAGE
export function AddMessage(data) {
  return async (dispatch) => {
    dispatch(addMessageSuccess(data));
  };
}

// UPDATE STATUS
export function UpdateStatus(data) {
  return async (dispatch) => {
    dispatch(updateUserStatus(data));
  };
}

// UPDATE CHAT HISTORY
export function FetchChatHistory(data) {
  return async (dispatch) => {
    dispatch(replaceChatHistory(data));
  };
}

// GET USERS
export function GetUsers() {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));
    await axios
      .get("/user/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then(function (response) {
        dispatch(fetchUsersSuccess(response?.data?.data?.users));
      })
      .catch(function (error) {
        dispatch(setError(error));
        toast.error(error?.message || "Something went wrong!");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// START CONVERSATION
export function StartConversation(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/user/start-conversation",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then(function (response) {
        dispatch(startConversationSuccess(response?.data?.data?.conversation));
      })
      .catch(function (error) {
        dispatch(setError(error));
        toast.error(error?.message || "Something went wrong!");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// GET CONVERSATIONS
export function GetConversations() {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));
    await axios
      .get("/user/conversations", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then(function (response) {
        dispatch(
          fetchConversationsSuccess(response?.data?.data?.conversations)
        );
      })
      .catch(function (error) {
        dispatch(setError(error));
        toast.error(error?.message || "Something went wrong!");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// SET CONVERSATION
export function SetCurrentConversation(id) {
  return async (dispatch) => {
    dispatch(setCurrentConversation(id));
  };
}

export default slice.reducer;
