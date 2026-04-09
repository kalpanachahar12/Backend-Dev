import User from "../model/member.schema.js";

export async function usercreate(name,membershipType) {
    try {
        const user = new User({
            name,
            membershipType
        });
        await user.save();
        return user;
    } catch (error) {
        console.log("user create error:", error);
        return null;
    }
}

export async function userupdate(id, name, membershipType) {
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { name, membershipType},
            { new: true }
        );
        if (!user) {
            return "not found";
        }
        return user;
    } catch (error) {
        console.log("user update error:", error);
        return null;
    }
}
export async function deleteuser(id) {
    try {
        const user =  User.findByIdAndDelete(id);
        if (!user) {
            return "not found";
        }

        return "user deleted";

    } catch (error) {
        console.log("user delete error:", error);
        return null;
    }
}