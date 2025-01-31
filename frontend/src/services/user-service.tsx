import { privateApi } from "./api";

const UserService = {
	getUserData: function() {
		return privateApi.get("/user");
	}
}

export default UserService;
