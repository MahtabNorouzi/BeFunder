import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../core/entities/user';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersRepository.findOne({ username });
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        console.log(user)
        const payload = user;
        return {
            ...user,
            token: this.jwtService.sign(payload),
        };
    }

    async getUserInfo(id: string): Promise<any> {
        const user = await this.usersRepository.findOne(id);
        // if (user) {
        //     const { password, ...result } = user;
        //     return result;
        // }
        return user;
    }

    async register(user: User): Promise<User> {
        return this.usersRepository.save(user);
    }
}
