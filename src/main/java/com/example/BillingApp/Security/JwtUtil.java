package com.example.BillingApp.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
@Slf4j
public class JwtUtil {

    @Value("${spring.jwt.secret-key}")
    private String secretKey;

    @Value("${spring.jwt.expiration}")
    private Long expiration;

    public SecretKey generateKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String email, String role) {

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        log.info("Token Generated!!");
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .signWith(generateKey())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .compact();
    }

    public Claims extractClaims(String token) {
        log.info("Extracted Claims");
        return Jwts.parserBuilder()
                .setSigningKey(generateKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }

    public boolean validateToken(String username, String token) {
        return username.equals(extractUsername(token))
                && !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token) {
        return extractClaims(token)
                .getExpiration()
                .before(new Date());
    }

}
