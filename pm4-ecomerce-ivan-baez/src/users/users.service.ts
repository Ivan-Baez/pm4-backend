import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from 'src/users/entities/users.entity';



@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}


   
  async getAllUsers(page:number,limit:number): Promise<Omit<Users, 'password'>[]> {
  return this.usersRepository.getAllUsers(page,limit);
}

async getUserById(id:string): Promise<Omit<Users, 'password'|'isAdmin'>> {
 return this.usersRepository.getUserById(id)
}

//addUser(userNewData:CreateUserDto){
//  return this.usersRepository.addUser(userNewData)
//}

updateUser(id:string,userNewData:any){
  return this.usersRepository.updateUser(id,userNewData);
}

deleteUser(id:string){
  return this.usersRepository.deleteUser(id)
}
}
