import java.awt.RenderingHints
import java.awt.image.BufferedImage
import java.io.File
import java.util.Properties
import javax.imageio.ImageIO
import javax.sound.sampled.AudioFileFormat
import javax.sound.sampled.AudioFormat
import javax.sound.sampled.AudioSystem
import kotlin.math.roundToInt

plugins {
    id("com.android.application")
}

val keystoreProperties = Properties()
val keystorePropertiesFile = rootProject.file("keystore.properties")
if (keystorePropertiesFile.exists()) {
    keystorePropertiesFile.inputStream().use { keystoreProperties.load(it) }
}

fun releaseSigningProperty(name: String): String? {
    return (keystoreProperties.getProperty(name) ?: findProperty("lostKingdom.$name") as String?)?.takeIf { it.isNotBlank() }
}

val hasReleaseSigning = listOf("storeFile", "storePassword", "keyAlias", "keyPassword")
    .all { releaseSigningProperty(it) != null }

val maxAndroidArtDimension = 640
val optimizedAndroidArtDir = layout.buildDirectory.dir("generated/android-art/Art")
val androidAudioSampleRate = 22050.0f
val optimizedAndroidAudioDir = layout.buildDirectory.dir("generated/android-audio/audio")

android {
    namespace = "com.hhy0111.lostkingdom"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.hhy0111.lostkingdom"
        minSdk = 23
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    signingConfigs {
        create("release") {
            if (hasReleaseSigning) {
                val storeFilePath = releaseSigningProperty("storeFile") ?: error("Missing release storeFile")
                storeFile = rootProject.file(storeFilePath)
                storePassword = releaseSigningProperty("storePassword") ?: error("Missing release storePassword")
                keyAlias = releaseSigningProperty("keyAlias") ?: error("Missing release keyAlias")
                keyPassword = releaseSigningProperty("keyPassword") ?: error("Missing release keyPassword")
            }
        }
    }

    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
            if (hasReleaseSigning) {
                signingConfig = signingConfigs.getByName("release")
            }
        }
    }

    sourceSets {
        getByName("main") {
            assets.srcDir(layout.buildDirectory.dir("generated/assets"))
        }
    }
}

val prepareAndroidArtAssets = tasks.register("prepareAndroidArtAssets") {
    val androidArtSourceDir = rootProject.layout.projectDirectory.dir("Assets/Art")
    inputs.dir(androidArtSourceDir)
    outputs.dir(optimizedAndroidArtDir)

    doLast {
        val sourceRoot = androidArtSourceDir.asFile
        val outputRoot = optimizedAndroidArtDir.get().asFile
        if (outputRoot.exists()) {
            outputRoot.deleteRecursively()
        }

        sourceRoot.walkTopDown()
            .filter { it.isFile && !it.name.equals(".DS_Store", ignoreCase = true) }
            .forEach { sourceFile ->
                val relativePath = sourceRoot.toPath().relativize(sourceFile.toPath()).toString()
                val outputFile = File(outputRoot, relativePath)
                outputFile.parentFile.mkdirs()

                if (!sourceFile.extension.equals("png", ignoreCase = true)) {
                    sourceFile.copyTo(outputFile, overwrite = true)
                    return@forEach
                }

                val sourceImage = ImageIO.read(sourceFile)
                if (sourceImage == null) {
                    sourceFile.copyTo(outputFile, overwrite = true)
                    return@forEach
                }

                val largestDimension = maxOf(sourceImage.width, sourceImage.height)
                if (largestDimension <= maxAndroidArtDimension) {
                    sourceFile.copyTo(outputFile, overwrite = true)
                    return@forEach
                }

                val scale = maxAndroidArtDimension.toDouble() / largestDimension.toDouble()
                val targetWidth = maxOf(1, (sourceImage.width * scale).roundToInt())
                val targetHeight = maxOf(1, (sourceImage.height * scale).roundToInt())
                val resized = BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_ARGB)
                val graphics = resized.createGraphics()
                try {
                    graphics.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC)
                    graphics.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY)
                    graphics.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON)
                    graphics.drawImage(sourceImage, 0, 0, targetWidth, targetHeight, null)
                } finally {
                    graphics.dispose()
                }
                ImageIO.write(resized, "png", outputFile)
            }
    }
}

val prepareAndroidAudioAssets = tasks.register("prepareAndroidAudioAssets") {
    val androidAudioSourceDir = rootProject.layout.projectDirectory.dir("web-game/audio")
    inputs.dir(androidAudioSourceDir)
    outputs.dir(optimizedAndroidAudioDir)

    doLast {
        val sourceRoot = androidAudioSourceDir.asFile
        val outputRoot = optimizedAndroidAudioDir.get().asFile
        if (outputRoot.exists()) {
            outputRoot.deleteRecursively()
        }

        sourceRoot.walkTopDown()
            .filter { it.isFile && !it.name.equals(".DS_Store", ignoreCase = true) }
            .forEach { sourceFile ->
                val relativePath = sourceRoot.toPath().relativize(sourceFile.toPath()).toString()
                val outputFile = File(outputRoot, relativePath)
                outputFile.parentFile.mkdirs()

                if (!sourceFile.extension.equals("wav", ignoreCase = true)) {
                    sourceFile.copyTo(outputFile, overwrite = true)
                    return@forEach
                }

                val header = ByteArray(12)
                val bytesRead = sourceFile.inputStream().use { it.read(header) }
                val isRiffWave = bytesRead == header.size &&
                    header[0] == 'R'.code.toByte() &&
                    header[1] == 'I'.code.toByte() &&
                    header[2] == 'F'.code.toByte() &&
                    header[3] == 'F'.code.toByte() &&
                    header[8] == 'W'.code.toByte() &&
                    header[9] == 'A'.code.toByte() &&
                    header[10] == 'V'.code.toByte() &&
                    header[11] == 'E'.code.toByte()
                if (!isRiffWave) {
                    sourceFile.copyTo(outputFile, overwrite = true)
                    return@forEach
                }

                AudioSystem.getAudioInputStream(sourceFile).use { sourceStream ->
                    val targetFormat = AudioFormat(
                        AudioFormat.Encoding.PCM_SIGNED,
                        androidAudioSampleRate,
                        16,
                        1,
                        2,
                        androidAudioSampleRate,
                        false
                    )
                    AudioSystem.getAudioInputStream(targetFormat, sourceStream).use { convertedStream ->
                        AudioSystem.write(convertedStream, AudioFileFormat.Type.WAVE, outputFile)
                    }
                }
            }
    }
}

val syncWebGameAssets = tasks.register<Sync>("syncWebGameAssets") {
    dependsOn(prepareAndroidArtAssets)
    dependsOn(prepareAndroidAudioAssets)
    into(layout.buildDirectory.dir("generated/assets"))
    from(rootProject.layout.projectDirectory.dir("web-game")) {
        into("web-game")
        exclude("audio/**")
    }
    from(optimizedAndroidAudioDir) {
        into("web-game/audio")
    }
    from(optimizedAndroidArtDir) {
        into("Art")
    }
    exclude("**/.DS_Store")
}

tasks.named("preBuild") {
    dependsOn(syncWebGameAssets)
}

tasks.register("signReleaseAab") {
    group = "publishing"
    description = "Builds and JAR-signs the release Android App Bundle for Play Console upload."
    dependsOn("bundleRelease")
    onlyIf { hasReleaseSigning }

    doLast {
        val unsignedBundle = layout.buildDirectory.file("outputs/bundle/release/android-app-release.aab").get().asFile
        val signedBundle = layout.buildDirectory.file("outputs/bundle/release/lost-kingdom-release-signed.aab").get().asFile
        ant.withGroovyBuilder {
            "signjar"(
                "jar" to unsignedBundle,
                "signedjar" to signedBundle,
                "alias" to releaseSigningProperty("keyAlias"),
                "keystore" to rootProject.file(releaseSigningProperty("storeFile") ?: error("Missing release storeFile")),
                "storepass" to releaseSigningProperty("storePassword"),
                "keypass" to releaseSigningProperty("keyPassword"),
                "sigalg" to "SHA256withRSA",
                "digestalg" to "SHA-256"
            )
        }
    }
}

dependencies {
    implementation("com.google.android.gms:play-services-ads:25.0.0")
    implementation("com.android.billingclient:billing:9.1.0")
    implementation("androidx.webkit:webkit:1.12.1")
}
