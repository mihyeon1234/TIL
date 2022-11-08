package com.app.mayfarm.user;

import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao {

	public HashMap<String, Object> SelectUserById(String Id);
		
	
}
