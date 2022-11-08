package com.app.mayfarm.user;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	UserDao dao;
	
	public HashMap<String, Object> SelectUserById(String id){
		return dao.SelectUserById(id);
	}
}
