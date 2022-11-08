package com.app.mayfarm.user;

import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class UserController {

	//private Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	UserService userService;
	
	
	@GetMapping(value ="/")
	@ResponseBody
	public HashMap<String, Object> SelectUser(){
		
		HashMap<String, Object> returnMap = new HashMap<>();
		
		returnMap.put("isSuccess", "true");
		
		HashMap<String, Object> tempUser =  userService.SelectUserById("");
		
		//logger.info(tempUser.toString());
		return returnMap;
		
	}
}
