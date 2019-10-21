```bash
LINUX启动Nginx的命令:
一、查询是否启动
[root@jiang php-fpm.d]# ps -ef | grep nginx
root     25225     1  0 19:26 ?        00:00:00 nginx: master process /app/nginx/sbin/nginx
www      25229 25225  0 19:26 ?        00:00:00 nginx: worker process
root     25247 19431  0 19:30 pts/0    00:00:00 grep nginx

二、启动
[root@jiang php-fpm.d]# /app/nginx/sbin/nginx
[root@jiang php-fpm.d]# ps -ef | grep nginx  
root     25192     1  0 19:22 ?        00:00:00 nginx: master process /app/nginx/sbin/nginx
www      25193 25192  0 19:22 ?        00:00:00 nginx: worker process
root     25195 19431  0 19:22 pts/0    00:00:00 grep nginx

三、停止
从容停止Nginx：
kill -QUIT 主进程号
[root@jiang php-fpm.d]# kill -QUIT 19513
[root@jiang php-fpm.d]# ps -ef | grep nginx
root     25190 19431  0 19:22 pts/0    00:00:00 grep nginx

快速停止Nginx：
kill -TERM 主进程号
[root@jiang php-fpm.d]# kill -TERM 25192
[root@jiang php-fpm.d]# ps -ef | grep nginx
root     25203 19431  0 19:23 pts/0    00:00:00 grep nginx
[root@jiang php-fpm.d]# 

强制停止Nginx：
kill -9 主进程号  
[root@jiang php-fpm.d]# kill -9 25205
[root@jiang php-fpm.d]# ps -ef | grep nginx
www      25206     1  0 19:24 ?        00:00:00 nginx: worker process
root     25210 19431  0 19:24 pts/0    00:00:00 grep nginx

四、重启
[root@jiang php-fpm.d]# /app/nginx/sbin/nginx -s reload
[root@jiang php-fpm.d]# 

五、查看端口占用
fuser -n tcp 80
结束端口占用
kill -9 7955 7956
六、查看当前开启的端口
netstat -tlnp


LINUX启动MYSQL的命令:
一、启动
[root@jiang host]# service mysqld start
Starting MySQL..                                           [  OK  ]
或者
[root@jiang host]# /etc/init.d/mysqld start
Starting MySQL..                                           [  OK  ]

二、停止
[root@jiang host]# service mysqld stop
Shutting down MySQL..                                      [  OK  ]
或者
[root@jiang host]# /etc/init.d/mysqld stop
Shutting down MySQL.                                       [  OK  ]

三、重启
[root@jiang host]# service mysqld restart
Shutting down MySQL..                                      [  OK  ]
Starting MySQL..                                           [  OK  ]
或者
[root@jiang host]# /etc/init.d/mysqld restart
Shutting down MySQL..                                      [  OK  ]
Starting MySQL..                                           [  OK  ]

四、查看mysql是否启动
[root@jiang host]# service mysqld status
MySQL running (24110)                                      [  OK  ]

[root@jiang host]# ps aux | grep mysqld

LINUX启动PHP的命令:
service php-fpm restart

停止PHP：
[root@jiang host]# pkill php-fpm
查看9000端口：
[root@jiang host]# netstat -lnt | grep 9000
[root@jiang host]# 

启动PHP：
[root@jiang sbin]# /app/php7.2/sbin/php-fpm
查看9000端口：
[root@jiang sbin]# netstat -tunlp | grep 9000
tcp        0      0 127.0.0.1:9000              0.0.0.0:*                   LISTEN
```